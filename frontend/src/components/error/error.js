import styled from 'styled-components';
import { H2 } from '../h2/h2';
import PropTypes from 'prop-types';

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #fff;
	margin: 15% auto;
	font-size: 21px;
`;

export const Error = ({ error }) =>
	error && (
		<Div>
			<H2>Ошибка</H2>
			<div>{error}</div>
		</Div>
	);

Error.propTypes = {
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
};
