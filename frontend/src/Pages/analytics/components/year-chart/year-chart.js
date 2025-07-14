import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { countByYear, getRandomColor } from '../../utils';
import PropTypes from 'prop-types';

export const YearChart = ({ travels }) => {
	const data = Object.entries(countByYear(travels))
		.sort(([a], [b]) => a - b)
		.map(([year, count]) => ({
			year,
			count,
			color: getRandomColor(),
		}));

	return (
		<ResponsiveContainer width="100%" height={300}>
			<LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="year" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="count"
					stroke="#8884d8"
					activeDot={{ r: 8, strokeWidth: 2, fill: 'white' }}
					dot={(props) => {
						const { cx, cy, payload } = props;
						return (
							<circle
								key={payload.year}
								cx={cx}
								cy={cy}
								r={8}
								stroke={payload.color}
								strokeWidth={2}
								fill="white"
							/>
						);
					}}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

YearChart.propTypes = {
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
