import { useEffect, useMemo, useState } from 'react';
import { debounce, request } from '../utils';
import { PAGINATION_LIMIT } from '../constants/pagination-limit';

export function usePaginatedSearch(endpoint, dataKey) {
	const [data, setData] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		request(
			`${endpoint}?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		)
			.then(({ data }) => {
				setData(data?.[dataKey] || []);
				setLastPage(data?.lastPage || 1);
			})
			.catch(() => {
				setData([]);
				setLastPage(1);
			})
			.finally(() => {
				setIsLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [endpoint, dataKey, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);
	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch((prev) => !prev);
	};

	return {
		data,
		page,
		setPage,
		lastPage,
		searchPhrase,
		onSearch,
		isLoading,
	};
}
