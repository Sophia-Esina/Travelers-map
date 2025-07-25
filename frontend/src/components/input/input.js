import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, width, ...prop }, ref) => {
	return <input className={className} {...prop} ref={ref} />;
});

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 40px;
	margin: 0 0 10px;
	padding: 10px;
	font-size: 18px;
	border: 1px solid #000;
	font-size: 18px;
	font-family: cursive;
`;

Input.propTypes = {
	width: PropTypes.string,
};
