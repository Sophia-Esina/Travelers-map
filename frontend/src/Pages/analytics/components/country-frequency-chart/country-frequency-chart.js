import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { countByCountry, getRandomColor } from '../../utils';
import PropTypes from 'prop-types';

export const CountryFrequencyChart = ({ travels }) => {
	const data = Object.entries(countByCountry(travels)).map(([country, count]) => ({
		country,
		count,
		color: getRandomColor(),
	}));
	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={data}>
				<XAxis dataKey="country" />
				<YAxis />
				<Tooltip />
				<Bar
					dataKey="count"
					fill="#8884d8"
					shape={(props) => {
						const { x, y, width, height, payload } = props;
						return (
							<rect
								x={x}
								y={y}
								width={width}
								height={height}
								fill={payload.color}
								rx={5}
							/>
						);
					}}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
};

CountryFrequencyChart.propTypes = {
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
