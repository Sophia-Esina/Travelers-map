import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
	position: absolute;
	top: 8px;
	left: 20px;
	z-index: 1000;
	background: white;
	border-radius: 6px;
	display: flex;
	align-items: center;
	font-family: cursive;

	input {
		width: 220px;
		padding: 6px 12px;
		font-size: 14px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-family: inherit;
		outline: none;
		transition: border-color 0.2s;

		&:focus {
			border-color: #888;
		}
	}

	button {
		padding: 6px 14px;
		font-size: 14px;
		border-radius: 4px;
		border: 1px solid #ccc;
		background-color: #ffdb4d;
		cursor: pointer;
		font-family: inherit;
		transition:
			background-color 0.2s,
			border-color 0.2s;

		&:hover {
			background-color: #ffd11b;
			border-color: #999;
		}
	}
`;

export const MapSearch = ({ ymapsInstance, onResult }) => {
	const inputRef = useRef();
	const [query, setQuery] = useState('');

	const handleSearch = () => {
		if (!query || !ymapsInstance) return;

		ymapsInstance.geocode(query).then((res) => {
			const firstGeoObject = res.geoObjects.get(0);
			if (firstGeoObject) {
				const coords = firstGeoObject.geometry.getCoordinates();
				onResult(coords);
			} else {
				alert('Ничего не найдено');
			}
		});
	};

	return (
		<SearchWrapper>
			<input
				ref={inputRef}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Введите адрес"
			/>
			<button onClick={handleSearch}>Найти</button>
		</SearchWrapper>
	);
};

MapSearch.propTypes = {
	ymapsInstance: PropTypes.shape({
		geocode: PropTypes.func.isRequired,
	}).isRequired,
	onResult: PropTypes.func.isRequired,
};
