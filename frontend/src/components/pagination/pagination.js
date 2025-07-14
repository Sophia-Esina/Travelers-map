import styled from 'styled-components';
import { Button } from '../button/button';
import PropTypes from 'prop-types';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<div className="current-page">Страница: {page}</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: auto;
	padding: 20px 0;

	& button {
		margin: 0 5px;
	}

	& .current-page {
		border-radius: 8px;
		border-color: #ff1f7c;
		color: #ff1f7c;
		background: #ffffffc2;
		padding: 12px 24px;
		height: 49px;
		display: flex;
		justify-content: center;
		width: 100%;
		height: 49px;
		margin: 0 5px;
		font-size: 18px;
		text-align: center;
	}
`;

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
