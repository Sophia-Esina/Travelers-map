import { useDispatch } from 'react-redux';
import { removeDreamAsync } from '../../../actions';
import { Button, H2, SpecialPanel } from '../../../components';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DreamDetailsContainer = ({
	className,
	dream: { id, userId, coordinates, title, country, city, notes, imageUrl, date },
	onMoveDreamToTravel,
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
				editPath={`/dream/${id}/edit`}
				onRemove={(id) => dispatch(removeDreamAsync(id))}
			/>
			<div className="dream-text">{notes}</div>
			<div className="publish-button-wrapper">
				<Button
					onClick={() =>
						onMoveDreamToTravel({
							id,
							title,
							country,
							city,
							date,
							notes,
							imageUrl,
							userId,
							coordinates,
						})
					}
				>
					Мечта стала реальностью
				</Button>
			</div>
		</div>
	);
};
export const DreamDetails = styled(DreamDetailsContainer)`
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

	& .dream-text {
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
		width: 280px;
		padding: 10px 20px;
	}
`;

DreamDetails.propTypes = {
	dream: PropTypes.shape({
		id: PropTypes.string.isRequired,
		userId: PropTypes.string.isRequired,
		coordinates: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		country: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		notes: PropTypes.string,
		imageUrl: PropTypes.string,
		date: PropTypes.string.isRequired,
	}).isRequired,
	onMoveDreamToTravel: PropTypes.func.isRequired,
};
