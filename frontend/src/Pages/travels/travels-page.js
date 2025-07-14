import styled from 'styled-components';
import { usePaginatedSearch } from '../../hooks';
import { Pagination, Search } from '../../components';
import { TravelCard } from './components';

const TravelsPageContainer = ({ className }) => {
	const {
		data: travels,
		page,
		setPage,
		lastPage,
		searchPhrase,
		onSearch,
		isLoading,
	} = usePaginatedSearch('/travel', 'travels');

	return isLoading ? (
		<div>Загрузка</div>
	) : (
		<div className={className}>
			<div className="posts-and-search">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{travels.length > 0 ? (
					<div className="travels-list">
						{travels.map(({ id, title, country, city, imageUrl, date }) => (
							<TravelCard
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
					<div className="no-travels-found">Путешествия не найдены</div>
				)}
			</div>
			{lastPage > 1 && travels.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const TravelsPage = styled(TravelsPageContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .travels-list {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding: 20px 20px 10px;
	}

	& .no-travels-found {
		font-size: 18px;
		margin-top: 40px;
		text-align: center;
	}
`;
