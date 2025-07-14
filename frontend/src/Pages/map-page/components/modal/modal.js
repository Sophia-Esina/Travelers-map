import PropTypes from 'prop-types';
import { Button } from '../../../../components';
import styled from 'styled-components';

export const ModalContainer = ({
	className,
	formData,
	setFormData,
	onSave,
	onCancel,
}) => {
	const handleInputChange = ({ target }) => {
		const { name, value } = target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className={className}>
			<div className="modal-overlay">
				<div className="modal-content">
					<h3>Новое путешествие</h3>
					<input
						name="title"
						placeholder="Название"
						value={formData.title}
						onChange={handleInputChange}
					/>
					<input
						name="imageUrl"
						placeholder="URL изображения"
						value={formData.imageUrl}
						onChange={handleInputChange}
					/>
					<input
						name="country"
						placeholder="Страна"
						value={formData.country}
						onChange={handleInputChange}
					/>
					<input
						name="city"
						placeholder="Город"
						value={formData.city}
						onChange={handleInputChange}
					/>
					<input
						type="date"
						name="date"
						value={formData.date}
						onChange={handleInputChange}
					/>
					<textarea
						name="notes"
						placeholder="Заметки"
						value={formData.notes}
						rows={3}
						onChange={handleInputChange}
					/>
					<div className="checkbox-group">
						<label>
							<input
								type="checkbox"
								name="isDream"
								checked={!formData.isDream}
								onChange={() =>
									setFormData((prev) => ({ ...prev, isDream: false }))
								}
							/>
							Путешествие
						</label>
						<label>
							<input
								type="checkbox"
								name="isDream"
								checked={formData.isDream}
								onChange={() =>
									setFormData((prev) => ({ ...prev, isDream: true }))
								}
							/>
							Мечта
						</label>
					</div>
					<div className="button-group">
						<Button className="save-btn" onClick={onSave}>
							Сохранить
						</Button>
						<Button className="cancel-btn" onClick={onCancel}>
							Отмена
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2000;
	}

	.modal-content {
		padding: 20px;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		gap: 5px;
		width: 520px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		color: #fff;
	}

	h3 {
		margin: 0 0 10px 0;
		text-align: center;
		font-size: 21px;
	}

	input,
	textarea {
		padding: 8px;
		font-size: 18px;
		font-family: cursive;
		border: 1px solid #ccc;
		border-radius: 4px;
		width: 100%;
		box-sizing: border-box;
	}

	.checkbox-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 10px;

		label {
			display: flex;
			align-items: center;
			cursor: pointer;
			font-size: 18px;
			color: #fff;

			input[type='checkbox'] {
				width: 18px;
				height: 18px;
				accent-color: #fff;
			}
		}
	}

	.button-group {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		margin-top: 10px;
	}

	.save-btn {
		background-color: #fff;
		color: #000;
	}

	.save-btn:hover {
		background-color: #ccc;
	}
`;

ModalContainer.propTypes = {
	className: PropTypes.string,
	formData: PropTypes.shape({
		id: PropTypes.string,
		userId: PropTypes.string,
		coordinates: PropTypes.string,
		imageUrl: PropTypes.string,
		published: PropTypes.bool,
		title: PropTypes.string,
		country: PropTypes.string,
		city: PropTypes.string,
		date: PropTypes.string,
		notes: PropTypes.string,
		isDream: PropTypes.bool,
	}).isRequired,
	setFormData: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
};
