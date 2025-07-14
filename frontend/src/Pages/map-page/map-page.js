import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { config } from '../../config';
import styled from 'styled-components';
import {
	AddTravelOrDream,
	DreamsPlacemark,
	MapSearch,
	SidebarList,
	TravelsPlacemark,
} from './components';
import { useState } from 'react';

const CENTER = [28.94077030138753, 41.31197058944388];
const ZOOM = 1.5;

const LoaderOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: rgba(255, 255, 255, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1001;
	font-size: 24px;
	font-family: cursive;
`;

const ControlPanel = styled.div`
	position: absolute;
	top: 3px;
	left: 375px;
	z-index: 1000;
	display: flex;
	gap: 10px;
	padding: 5px 10px;
	border-radius: 6px;

	& select,
	& button {
		font-size: 14px;
		font-family: cursive;
		height: 30px;
		border-radius: 4px;
		border: 1px solid #ccc;
		background-color: white;
		cursor: pointer;
		padding: 0 10px;
	}
`;

const PageWrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100vh;
	overflow: hidden;
`;

const MapContainer = styled.div`
	flex: 1;
	height: 100vh;
	position: relative;
`;

const MapPageContainer = () => {
	const [filter, setFilter] = useState('all');
	const [selectedCoords, setSelectedCoords] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [ymapsInstance, setYmapsInstance] = useState(null);

	const handleMapClick = (e) => {
		const coords = e.get('coords');
		setSelectedCoords(coords);
	};

	const handleAddClick = () => {
		if (!selectedCoords) {
			alert('Сначала выберите метку на карте');
			return;
		}
		setShowModal(true);
	};

	const handleCancel = () => {
		setShowModal(false);
		setSelectedCoords(null);
	};

	return (
		<PageWrapper>
			<MapContainer>
				<YMaps
					query={{
						apikey: config.YANDEX_API_KEY,
						load: 'Map,Placemark,geocode',
					}}
				>
					{isLoading && <LoaderOverlay>Загрузка карты...</LoaderOverlay>}
					<ControlPanel>
						<select
							value={filter}
							onChange={(e) => setFilter(e.target.value)}
						>
							<option value="all">Все</option>
							<option value="travel">Только путешествия</option>
							<option value="dream">Только мечты</option>
						</select>
						<button onClick={handleAddClick}>
							Добавить путешествие/мечту
						</button>
					</ControlPanel>

					<Map
						defaultState={{ center: CENTER, zoom: ZOOM }}
						width="100%"
						height="100%"
						onClick={handleMapClick}
						onLoad={(ymaps) => {
							setIsLoading(false);
							setYmapsInstance(ymaps);
						}}
					>
						{selectedCoords && (
							<Placemark
								geometry={selectedCoords}
								options={{
									draggable: true,
									preset: 'islands#greenIcon',
								}}
								onDragEnd={(e) => {
									const newCoords = e
										.get('target')
										.geometry.getCoordinates();
									setSelectedCoords(newCoords);
								}}
							/>
						)}

						{filter !== 'dream' && <TravelsPlacemark />}
						{filter !== 'travel' && <DreamsPlacemark />}
					</Map>
					<MapSearch
						ymapsInstance={ymapsInstance}
						onResult={(coords) => {
							setSelectedCoords(coords);
						}}
					/>
				</YMaps>
				{showModal && selectedCoords && (
					<AddTravelOrDream
						selectedCoords={selectedCoords}
						onClose={handleCancel}
					/>
				)}
			</MapContainer>
			<SidebarList onSelect={(coords) => setSelectedCoords(coords)} />
		</PageWrapper>
	);
};

export const MapPage = styled(MapPageContainer)``;
