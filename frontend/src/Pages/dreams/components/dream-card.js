import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DreamCardContainer = ({ className, id, title, country, city, imageUrl, date }) => {
	return (
		<div className={className}>
			<Link to={`/dream/${id}`}>
				<img src={imageUrl} alt={country} />
				<div className="dream-card-footer">
					<h4>{title}</h4>
					<div className="dream-card-info">
						{date} {country} {city}
					</div>
				</div>
			</Link>
		</div>
	);
};

export const DreamCard = styled(DreamCardContainer)`
	width: 280px;
	margin: 10px;
	border: 1px solid #ffffff;
	box-shadow: 2px 2px 25px 0 rgba(0, 0, 0, 0.83);
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	color: #fff;
	font-size: 18px;

	& img {
		display: block;
		width: 100%;
	}

	& .dream-card-footer {
		padding: 5px;
		border-top: 1px solid #fff;
	}

	& h4 {
		margin: 0;
		color: #fff;
		text-align: center;
	}

	& .dream-card-info {
		display: flex;
		justify-content: center;
		margin-top: 5px;
		color: #fff;
	}
`;

DreamCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	country: PropTypes.string.isRequired,
	city: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	imageUrl: PropTypes.string,
};
