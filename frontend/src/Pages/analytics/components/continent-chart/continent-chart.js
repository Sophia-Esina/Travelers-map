import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getContinent, getRandomColor } from '../../utils';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CenteredPieChartWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 320px;
`;

export const ContinentChart = ({ travels }) => {
	const continentFrequency = {};

	travels.forEach((travel) => {
		const continent = getContinent(travel.country);
		continentFrequency[continent] = (continentFrequency[continent] || 0) + 1;
	});

	const data = Object.entries(continentFrequency).map(([name, value]) => ({
		name,
		value,
	}));

	return (
		<CenteredPieChartWrapper>
			<PieChart width={500} height={300}>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					labelLine={false}
					outerRadius={100}
					fill="#8884d8"
					dataKey="value"
					label={({ name, percent }) =>
						`${name}: ${(percent * 100).toFixed(0)}%`
					}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={getRandomColor()} />
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</CenteredPieChartWrapper>
	);
};

ContinentChart.propTypes = {
	travels: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			user: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			coordinates: PropTypes.string.isRequired,
			country: PropTypes.string.isRequired,
			city: PropTypes.string.isRequired,
			date: PropTypes.string.isRequired,
			imageUrl: PropTypes.string,
			notes: PropTypes.string,
			published: PropTypes.bool,
		}),
	).isRequired,
};
