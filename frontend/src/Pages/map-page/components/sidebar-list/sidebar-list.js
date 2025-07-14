import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { request } from '../../../../utils';
import PropTypes from 'prop-types';

const HEADER_HEIGHT = 80;

const SidebarOverlay = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'isOpen',
})`
	position: absolute;
	top: 62px;
	right: 0;
	height: 100vh;
	width: ${(props) => (props.isOpen ? '300px' : '0')};
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(6px);
	box-shadow: ${(props) => (props.isOpen ? '-2px 0 8px rgba(0,0,0,0.2)' : 'none')};
	overflow-x: hidden;
	transition: width 0.3s ease;
	z-index: 2000;
	display: flex;
	flex-direction: column;
	padding: ${(props) => (props.isOpen ? '20px' : '0')};
`;

const ToggleButton = styled.button.withConfig({
	shouldForwardProp: (prop) => prop !== 'isOpen',
})`
	position: absolute;
	top: calc(${HEADER_HEIGHT}px + 20px);
	right: ${(props) => (props.isOpen ? '300px' : '0')};
	transform: translateX(50%);
	width: 30px;
	height: 60px;
	background-color: #ffffffdd;
	border: none;
	cursor: pointer;
	border-radius: 8px 0 0 8px;
	box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
	font-family: cursive;
	z-index: 2100;
	transition: right 0.3s;

	&:hover {
		background-color: #f0f0f0;
	}
`;

const List = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const ListItem = styled.li`
	cursor: pointer;
	border-radius: 10px;
	padding: 10px 14px;
	background-color: ${(props) => (props.type === 'travel' ? '#d0ecff' : '#ffe0cc')};
	border: 1px solid ${(props) => (props.type === 'travel' ? '#a3d3f8' : '#ffc5a1')};

	&:hover {
		background-color: ${(props) => (props.type === 'travel' ? '#b5dcf7' : '#ffd2b3')};
	}
`;

export const SidebarList = ({ onSelect }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [items, setItems] = useState([]);

	useEffect(() => {
		Promise.all([request('/travel'), request('/dream')])
			.then(([travelRes, dreamRes]) => {
				const travels = travelRes?.data?.travels || [];
				const dreams = dreamRes?.data?.dreams || [];
				setItems([...travels, ...dreams]);
			})
			.catch((error) => {
				console.error('Ошибка загрузки меток:', error);
			});
	}, []);

	const uniqueCountries = [...new Set(items.map((item) => item.country))];

	return (
		<>
			<ToggleButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)}>
				{isOpen ? '→' : '←'}
			</ToggleButton>
			<SidebarOverlay isOpen={isOpen}>
				{isOpen && (
					<>
						<h2>Ваши метки</h2>
						<List>
							{uniqueCountries.map((country) => {
								const mark = items.find(
									(item) => item.country === country,
								);
								if (!mark) return null;

								return (
									<ListItem
										key={country}
										type={mark.type}
										onClick={() => {
											const coords = mark.coordinates
												.split(',')
												.map((c) => parseFloat(c.trim()));
											onSelect(coords);
										}}
									>
										{country}
									</ListItem>
								);
							})}
						</List>
					</>
				)}
			</SidebarOverlay>
		</>
	);
};

SidebarList.propTypes = {
	onSelect: PropTypes.func.isRequired,
};
