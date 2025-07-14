import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { request } from '../../utils';

export const PublishedTravelsContainer = ({ className }) => {
	const [travels, setTravels] = useState([]);

	useEffect(() => {
		request('/travel/public').then(({ data: { travels } }) => {
			setTravels(travels);
		});
	}, []);

	return (
		<div className={className}>
			{travels.map(({ id, user, imageUrl, country, city, title, notes, date }) => (
				<div className="travel-card" key={id}>
					<img src={imageUrl} alt={country} />
					<h4>{title}</h4>
					<div className="travel-card-info">
						<div> Автор: {user}</div>
						{date} {country} {city}
						<div>{notes}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export const PublishedTravels = styled(PublishedTravelsContainer)`
	padding: 40px 150px;
	display: flex;
	flex-direction: column;
	gap: 30px;
	align-items: center;

	.travel-card {
		width: 100%;
		max-width: 600px;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		color: #fff;
		transition: transform 0.2s ease;
		cursor: pointer;

		img {
			width: 100%;
			height: 250px;
			object-fit: cover;
			border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		}

		h4 {
			margin: 16px;
			font-size: 1.25rem;
			color: #fff;
		}

		.travel-card-info {
			padding: 0 16px 16px;
			font-size: 0.95rem;
			color: #fff;
			line-height: 23px;

			div {
				margin-top: 8px;
				color: #ddd;
			}
		}
	}
`;
