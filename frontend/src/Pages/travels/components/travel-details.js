import { useDispatch } from 'react-redux';
import { removeTravelAsync } from '../../../actions';
import { Button, H2, SpecialPanel } from '../../../components';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TravelDetailsContainer = ({
	className,
	travel: { id, title, country, city, notes, imageUrl, date, published },
	onPublish,
}) => {
	const dispatch = useDispatch();

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel
				id={id}
				date={date}
				country={country}
				city={city}
				margin="-20px 0 20px"
				editPath={`/travel/${id}/edit`}
				onRemove={(id) => dispatch(removeTravelAsync(id))}
			/>
			<div className="travel-text">{notes}</div>
			<div className="publish-button-wrapper">
				<Button onClick={onPublish} disabled={published === true}>
					{published ? 'Опубликовано' : 'Опубликовать'}
				</Button>
			</div>
		</div>
	);
};
export const TravelDetails = styled(TravelDetailsContainer)`
	box-shadow: 2px 2px 25px 0 rgba(0, 0, 0, 0.83);
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	padding: 20px;
	font-family: cursive;
	font-size: 18px;
	color: #fff;

	& img {
		margin: 0 0 0 100px;
		width: 80%;
	}

	& .travel-text {
		font-size: 18px;
		white-space: pre-line;
		text-align: justify;
	}

	& h2 {
		display: flex;
		justify-content: center;
	}

	& .publish-button-wrapper {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	& button {
		width: 171px;
		padding: 10px 20px;
	}
`;

TravelDetails.propTypes = {
	travel: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		country: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		notes: PropTypes.string,
		imageUrl: PropTypes.string,
		date: PropTypes.string.isRequired,
		published: PropTypes.bool.isRequired,
	}).isRequired,
	onPublish: PropTypes.func.isRequired,
};
