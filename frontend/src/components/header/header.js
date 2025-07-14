import styled from 'styled-components';
import { ControlPanel } from './components';
import PropTypes from 'prop-types';

const HeaderContainer = ({ className, setIsLoggedIn }) => (
	<header className={className}>
		<ControlPanel setIsLoggedIn={setIsLoggedIn} />
	</header>
);

export const Header = styled(HeaderContainer)`
	width: 100%;
    padding: 20px 40px;
    background-color: #fff;
    border-bottom: 1px solid;
    font-family: cursive;
	background: #ff1f7c;
}
`;

Header.propTypes = {
	setIsLoggedIn: PropTypes.func.isRequired,
};
