export const countByCountry = (travels) => {
	const counts = {};

	for (const travel of travels) {
		const country = travel.country;
		counts[country] = (counts[country] || 0) + 1;
	}

	return counts;
};
