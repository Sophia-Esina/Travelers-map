import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
	RESET_DREAM_DATA,
	LoadDreamAsync,
	saveDreamAsync,
	moveDreamToTravelsAsync,
} from '../../actions';
import { selectDream } from '../../selectors';
import { Error } from '../../components';
import { DreamDetails, DreamForm } from './components';

const DreamDetailsPageContainer = ({ className }) => {
	const dispatch = useDispatch();
	const dream = useSelector(selectDream);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const params = useParams();
	const navigate = useNavigate();
	const isCreating = !!useMatch('/dream');
	const isEditing = !!useMatch('/dream/:id/edit');

	useLayoutEffect(() => {
		if (isCreating) {
			dispatch(RESET_DREAM_DATA);
		}
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(LoadDreamAsync(params.id)).then((result) => {
			setError(result.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id, isCreating]);

	const handleSaveDream = (data) => {
		dispatch(saveDreamAsync(data)).then(({ id }) => {
			navigate(`/dream/${id}`);
		});
	};

	// Перенос в путешествия
	const handleMoveDreamToTravel = async () => {
		const travel = await dispatch(moveDreamToTravelsAsync(dream.id));
		navigate(`/travel/${travel.id}`);
	};

	if (isLoading) return null;
	if (error) return <Error error={error} />;

	return (
		<div className={className}>
			{isCreating || isEditing ? (
				<DreamForm dream={dream} onSaveDream={handleSaveDream} />
			) : (
				<DreamDetails
					dream={dream}
					onMoveDreamToTravel={handleMoveDreamToTravel}
				/>
			)}
		</div>
	);
};

export const DreamDetailsPage = styled(DreamDetailsPageContainer)`
	margin: 50px 0;
	padding: 0 80px;
`;
