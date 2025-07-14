import styled from 'styled-components';
import { usePaginatedSearch } from '../../hooks';
import { Pagination, Search } from '../../components';
import { DreamCard } from './components';

const DreamPageContainer = ({ className }) => {
	const {
		data: dreams,
		page,
		setPage,
		lastPage,
		searchPhrase,
		onSearch,
		isLoading,
	} = usePaginatedSearch('/dream', 'dreams');

	return isLoading ? (
		<div>Загрузка</div>
	) : (
		<div className={className}>
			<div className="dreams-and-search">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{dreams.length > 0 ? (
					<div className="dreams-list">
						{dreams.map(({ id, title, country, city, imageUrl, date }) => (
							<DreamCard
								key={id}
								id={id}
								title={title}
								country={country}
								city={city}
								imageUrl={imageUrl}
								date={date}
							/>
						))}
					</div>
				) : (
					<div className="no-dreams-found">Страница желаний пока пуста</div>
				)}
			</div>
			{lastPage > 1 && dreams.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const DreamsPage = styled(DreamPageContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .dreams-list {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding: 20px 20px 10px;
	}

	& .no-dreams-found {
		font-size: 18px;
		margin-top: 40px;
		text-align: center;
	}
`;
