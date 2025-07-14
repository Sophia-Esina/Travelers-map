import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CLOSE_MODAL, openModal } from '../../actions';
import { Icon } from '..';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SpecialPanelContainer = ({
	className,
	id,
	date,
	country,
	city,
	editPath,
	onEdit,
	onSave,
	onRemove,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleRemove = () => {
		dispatch(
			openModal({
				text: 'Удалить запись?',
				onConfirm: () => {
					onRemove(id).then(() => {
						navigate(-1);
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const handleEdit = () => {
		if (editPath) navigate(editPath);
		else if (onEdit) onEdit();
	};

	return (
		<div className={className}>
			<div>
				{country}, {city}, {date}
			</div>
			<div className="buttons">
				{onSave ? (
					<Icon
						id="fa-floppy-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={onSave}
					/>
				) : null}
				{editPath || onEdit ? (
					<Icon
						id="fa-pencil-square-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={handleEdit}
					/>
				) : null}
				{onRemove && (
					<Icon
						id="fa-trash-o"
						size="21px"
						margin="0 0 0 7px"
						onClick={handleRemove}
					/>
				)}
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .published-at {
		display: flex;
		font-size: 18px;
	}

	& .buttons {
		display: flex;
	}

	& i {
		position: relative;
		top: -1px;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	country: PropTypes.string.isRequired,
	city: PropTypes.string.isRequired,
	editPath: PropTypes.string,
	onEdit: PropTypes.func,
	onSave: PropTypes.func,
	onRemove: PropTypes.func,
};
