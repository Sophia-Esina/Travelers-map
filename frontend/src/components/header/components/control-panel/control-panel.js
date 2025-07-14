import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserPhoto, selectUserSession } from '../../../../selectors';
import { logout } from '../../../../actions';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledLink = styled(Link)`
	text-align: center;
  	text-decoration: none;
  	margin: 20px 0;
  	font-size: 19px;
  	color: ${({ $active }) => ($active ? '#000' : '#fff')};
    transition: 0.3s ease;

  	&:hover {
   		color: #000;
`;

const Div = styled.div`
	text-align: center;
	margin: 20px 0;
	font-size: 19px;
	color: #fff;

		&:hover {
   		color: #000;
		cursor: pointer;
`;

const links = [
	{ to: '/', label: 'Главная' },
	{ to: '/travel', label: 'Мои путешествия' },
	{ to: '/dream', label: 'Карта мечты' },
	{ to: '/analitics', label: 'Аналитика' },
];

const ControlPanelContainer = ({ className, setIsLoggedIn }) => {
	const location = useLocation();
	const photo = useSelector(selectUserPhoto);
	const session = useSelector(selectUserSession);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem('userData');
		setIsLoggedIn(false);
		navigate('/login');
	};

	return (
		<div className={className}>
			<Div onClick={() => navigate('/published-travels')}>Traveler's map</Div>
			<nav className="navigation">
				{links.map(({ to, label }) => {
					const isActive =
						to === '/'
							? location.pathname === '/'
							: location.pathname.startsWith(to);

					return (
						<StyledLink key={to} to={to} $active={isActive}>
							{label}
						</StyledLink>
					);
				})}
			</nav>
			<img src={photo} alt="User" onClick={() => navigate('/user')} />
			<Div onClick={onLogout}>Выйти </Div>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: -23px;

	& img {
		height: 52px;
		border-radius: 50%;
		border: 1.5px solid #000;
		margin: 6px -1px -1px -1px;
		cursor: pointer;
	}

	& .navigation {
		text-align: center;
		margin: 20px 0;
		display: contents;
	}
`;

ControlPanel.propTypes = {
	setIsLoggedIn: PropTypes.func.isRequired,
};
