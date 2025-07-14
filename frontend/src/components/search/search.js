import styled from 'styled-components';
import { Input } from '../input/input';
import { Icon } from '../icon/icon';
import PropTypes from 'prop-types';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input value={searchPhrase} placeholder="Поиск..." onChange={onChange} />
			<Icon inactive={true} id="fa-search" size="21px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 268px;
	height: 45px;
	margin: 28px auto 0;

	& > input {
		padding: 10px 32px 10px 10px;
		border: 1px solid #ffffff;
		box-shadow: 2px 2px 25px 0 rgba(0, 0, 0, 0.83);
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		color: #fff;
		font-size: 18px;
	}

	& > input::placeholder {
		color: #fff;
		opacity: 1;
	}

	& > div {
		position: absolute;
		top: 3px;
		right: 9px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
