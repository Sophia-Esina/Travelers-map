import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonContainer = ({ children, className, width, disabled, ...props }) => {
	return (
		<button className={className} disabled={disabled} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #ff1f7c;
	color: #fff;
	font-size: 18px;
	width: ${({ width = '100%' }) => width};
	padding: 12px 24px;
	border: none;
	border-radius: 8px;
	text-decoration: none;
	font-family: cursive;
	transition:
		background-color 0.3s ease,
		opacity 0.3s ease;

	&:hover {
		background-color: #b7004c;
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	}

	opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
	disabled: PropTypes.bool,
};
