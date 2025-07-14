import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveUserAsync } from '../../../../actions';
import { Button, Input } from '../../../../components';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ChangeUserDataContainer = ({
	className,
	onCloseEditor,
	user: { id, photo, biography },
}) => {
	const [photoUrlValue, setPhotoUrlValue] = useState(photo || '');
	const biographyRef = useRef(null);
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		setPhotoUrlValue(photoUrlValue);
	}, [photoUrlValue]);

	const onSave = () => {
		const newBiography = biographyRef.current.innerHTML;

		dispatch(
			saveUserAsync({
				id,
				photo: photoUrlValue,
				biography: newBiography,
			}),
		).then(() => onCloseEditor());
	};

	const onPhotoChange = ({ target }) => setPhotoUrlValue(target.value);

	return (
		<div className={className}>
			<div className="edit-section">
				<label>URL фото:</label>
				<Input type="text" value={photoUrlValue} onChange={onPhotoChange} />
			</div>
			<div className="edit-section">
				<label>О себе:</label>
				<div
					className="biography-text"
					ref={biographyRef}
					contentEditable={true}
					suppressContentEditableWarning={true}
				>
					{biography}
				</div>
			</div>
			<div className="button-group">
				<Button onClick={onCloseEditor}>Отмена</Button>
				<Button onClick={onSave}>Сохранить</Button>
			</div>
		</div>
	);
};

export const ChangeUserData = styled(ChangeUserDataContainer)`
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 30px;
	border-radius: 16px;

	.edit-section {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.edit-section label {
		font-weight: bold;
		color: #fff;
	}

	.biography-text {
		width: 100%;
		padding: 12px;
		font-size: 16px;
		background: #f0f0f0;
		color: #000;
		border: 1px solid #ccc;
		border-radius: 6px;
		min-height: 100px;
		outline: none;
		transition: box-shadow 0.2s ease-in-out;
	}

	.biography-text:focus {
		box-shadow: 0 0 5px rgba(100, 150, 255, 0.7);
	}

	.button-group {
		display: flex;
		justify-content: flex-end;
		gap: 20px;
		margin-top: 10px;
	}
`;

ChangeUserDataContainer.propTypes = {
	onCloseEditor: PropTypes.func.isRequired,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		photo: PropTypes.string,
		biography: PropTypes.string,
	}).isRequired,
};
