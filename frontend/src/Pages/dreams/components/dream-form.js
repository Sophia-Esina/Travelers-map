import { useLayoutEffect, useRef, useState } from 'react';
import { Input, SpecialPanel } from '../../../components';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DreamFormContainer = ({
	className,
	dream: { id, title, country, city, notes, imageUrl, date },
	onSaveDream,
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const notesRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);

	const handleSave = () => {
		const newNotes = notesRef.current.innerHTML;
		onSaveDream({
			id,
			title: titleValue,
			image: imageUrlValue,
			notes: newNotes,
		});
	};

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				placeholder="Изображение..."
				onChange={(e) => setImageUrlValue(e.target.value)}
			/>
			<Input
				value={titleValue}
				placeholder="Заголовок..."
				onChange={(e) => setTitleValue(e.target.value)}
			/>
			<SpecialPanel
				id={id}
				date={date}
				country={country}
				city={city}
				margin="20px 0"
				onSave={handleSave}
			/>
			<div
				ref={notesRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="travel-text"
			>
				{notes}
			</div>
		</div>
	);
};

export const DreamForm = styled(DreamFormContainer)`
	box-shadow: 2px 2px 25px 0 rgba(0, 0, 0, 0.83);
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	padding: 20px;
	font-size: 18px;
	font-family: cursive;
	color: #fff;

	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& i {
		color: #fff;
	}

	& .travel-text {
		min-height: 80px;
		border: 1px solid #000000;
		background: #fff;
		font-size: 18px;
		white-space: pre-line;
		margin: 0 0 10px;
		padding: 10px;
		color: #000;
	}
`;

DreamForm.propTypes = {
	dream: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		country: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		notes: PropTypes.string,
		imageUrl: PropTypes.string,
		date: PropTypes.string.isRequired,
	}).isRequired,
	onSaveDream: PropTypes.func.isRequired,
};
