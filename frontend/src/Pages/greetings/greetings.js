import styled from 'styled-components';
import { Link } from 'react-router-dom';

const GreetingContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="overlay">
				<div className="card">
					<h1>Карта Путешественника</h1>
					<p>Сохраняйте воспоминания. Стройте мечты. Путешествуйте.</p>

					<Link to="/login" className="start-button">
						Давайте начнём →
					</Link>
				</div>
			</div>
		</div>
	);
};

export const Greeting = styled(GreetingContainer)`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	.overlay {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		padding: 40px 60px;
		text-align: center;
		color: #fff;
		max-width: 600px;

		h1 {
			font-family: 'Pacifico', cursive;
			font-size: 48px;
			margin-bottom: 20px;
		}

		p {
			font-size: 20px;
			margin-bottom: 24px;
		}

		ul {
			margin: 0 auto 30px;
			padding: 0;
			list-style: none;
			font-family: cursive;

			i {
				font-size: 21px;
				margin-bottom: 10px;
				color: #fff;
			}
		}

		.start-button {
			background-color: #ff1f7c;
			color: #fff;
			padding: 12px 24px;
			border: none;
			border-radius: 8px;
			text-decoration: none;
			font-size: 18px;
			transition: background-color 0.3s ease;

			&:hover {
				background-color: #b7004c;
			}
		}
	}
`;
