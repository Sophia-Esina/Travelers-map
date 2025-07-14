import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveTravelAsync, saveDreamAsync } from '../../../../actions';
import { Modal } from '../modal/modal';
import PropTypes from 'prop-types';

export const AddTravelOrDream = ({ selectedCoords, onClose }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		id: '',
		userId: '',
		coordinates: '',
		imageUrl: '',
		published: false,
		title: '',
		country: '',
		city: '',
		date: '',
		notes: '',
		isDream: false,
	});

	const handleSave = () => {
		const { isDream, ...cleanFormData } = formData;
		const dataToSave = {
			...cleanFormData,
			coordinates: selectedCoords.join(', '),
			image: cleanFormData.imageUrl,
		};

		const action = isDream ? saveDreamAsync : saveTravelAsync;
		dispatch(action(dataToSave)).then((saved) => {
			if (saved?._id) {
				const path = isDream ? `/dream/${saved.id}` : `/travel/${saved.id}`;
				navigate(path);
			}
		});

		onClose();
	};

	return (
		<Modal
			formData={formData}
			setFormData={setFormData}
			onSave={handleSave}
			onCancel={onClose}
		/>
	);
};

AddTravelOrDream.propTypes = {
	selectedCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
	onClose: PropTypes.func.isRequired,
};
