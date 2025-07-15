import { useSelector } from 'react-redux';
import { selectUser } from '../../selectors';
import { useState } from 'react';
import { Button } from '../../components';
import styled from 'styled-components';
import { ChangeUserData } from './components/change-user-data/change-user-data';

const UserProfileContainer = ({ className }) => {
	const user = useSelector(selectUser);
	const [isEditing, setIsEditing] = useState(false);

	const handleEditToggle = () => {
		setIsEditing((prev) => !prev);
	};

	if (!user) return null;

	const { login, registeredAt, photo, biography, country } = user;

	return (
		<div className={className}>
			{isEditing ? (
				<ChangeUserData user={user} onCloseEditor={handleEditToggle} />
			) : (
				<>
					<div className="content">
						<div>
							<img src={photo} alt="User" />
						</div>
						<div className="user-data">
							<div>Имя пользователя: {login}</div>
							<div>Зарегистрирован: {registeredAt}</div>
							<div>О себе: {biography}</div>
							<div>Страна: {country}</div>
						</div>
					</div>

					<div className="button-group">
						<Button onClick={handleEditToggle}>Редактировать профиль</Button>
					</div>
				</>
			)}
		</div>
	);
};

export const UserProfile = styled(UserProfileContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30px;
	margin: 50px auto;
	width: 80%;
	max-width: 900px;
	font-size: 18px;
	color: #fff;
	background: rgba(255, 255, 255, 0.07);
	backdrop-filter: blur(12px);
	border-radius: 16px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);

	.content {
		display: flex;
		width: 100%;
		align-items: flex-start;
	}

	img {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		object-fit: cover;
		border: 4px solid #fff;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.user-data {
		margin-left: 40px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		line-height: 1.6;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
	}

	.user-data div {
		margin-bottom: 12px;
		font-size: 20px;
	}

	.button-group {
		margin-top: 40px;
		display: flex;
		justify-content: center;
		width: 100%;
	}
`;
