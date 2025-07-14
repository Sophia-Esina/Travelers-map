const parseCustomDate = (dateStr) => {
	const [day, month, year] = dateStr.split('.');
	return new Date(`${year}-${month}-${day}`);
};

export const countByYear = (travels) => {
	const counts = {};

	for (const travel of travels) {
		const date = parseCustomDate(travel.date);
		const year = date.getFullYear();
		counts[year] = (counts[year] || 0) + 1;
	}

	return counts;
};
