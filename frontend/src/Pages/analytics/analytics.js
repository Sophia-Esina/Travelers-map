import { useEffect, useState } from 'react';
import { ContinentChart, CountryFrequencyChart, YearChart } from './components';
import { H2 } from '../../components';
import styled from 'styled-components';
import { request } from '../../utils';

const AnalyticsContainer = ({ className }) => {
	const [travels, setTravels] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		request('/travel').then(({ data: { travels } }) => {
			setTravels(travels);
			setIsLoading(false);
		});
	}, []);

	return isLoading ? (
		<div>Загрузка</div>
	) : (
		<div className={className}>
			<H2>Частота путешествий по странам</H2>
			<CountryFrequencyChart travels={travels} />
			<H2>Путешествия по годам</H2>
			<YearChart travels={travels} />
			<H2>Путешествия по континентам</H2>
			<ContinentChart travels={travels} />
		</div>
	);
};

export const Analytics = styled(AnalyticsContainer)`
	background: #ffffffc2;
	margin: 30px;
	padding: 0px 20px 20px 20px;
	font-size: 18px;
	font-family: cursive;

	& h2 {
		justify-content: center;
		display: flex;
		margin: 10px;
	}
`;
