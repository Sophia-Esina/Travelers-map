import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
	LoadTravelAsync,
	RESET_TRAVEL_DATA,
	saveTravelAsync,
	removeTravelAsync,
} from '../../actions';
import { selectTravel } from '../../selectors';
import { Error } from '../../components';
import { TravelDetails, TravelForm } from './components';

const TravelDetailsPageContainer = ({ className }) => {
	const dispatch = useDispatch();
	const travel = useSelector(selectTravel);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const params = useParams();
	const navigate = useNavigate();
	const isCreating = !!useMatch('/travel');
	const isEditing = !!useMatch('/travel/:id/edit');

	useLayoutEffect(() => {
		if (isCreating) {
			dispatch(RESET_TRAVEL_DATA);
		}
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(LoadTravelAsync(params.id)).then((result) => {
			setError(result.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id, isCreating]);

	const handleSaveTravel = (data) => {
		dispatch(saveTravelAsync(data)).then(({ id }) => {
			navigate(`/travel/${id}`);
		});
	};

	// Публикация
	const handlePublish = () => {
		dispatch(saveTravelAsync({ id: travel.id, published: true })).then(() => {
			navigate(`/travel/${travel.id}`);
		});
	};

	// Удаление
	const handleRemove = (id) => {
		dispatch(removeTravelAsync(id)).then(() => {
			navigate('/travel');
		});
	};

	if (isLoading) return null;
	if (error) return <Error error={error} />;

	return (
		<div className={className}>
			{isCreating || isEditing ? (
				<TravelForm travel={travel} onSaveTravel={handleSaveTravel} />
			) : (
				<TravelDetails
					travel={travel}
					onPublish={handlePublish}
					onRemove={handleRemove}
				/>
			)}
		</div>
	);
};

export const TravelDetailsPage = styled(TravelDetailsPageContainer)`
	margin: 50px 0;
	padding: 0 80px;
`;
