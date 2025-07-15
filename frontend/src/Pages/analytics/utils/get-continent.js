const CONTINENT_MAP = {
	Europe: ['Germany', 'France', 'Spain', 'Italy', 'Sweden', 'Russia', 'Romania'],
	Asia: ['Japan', 'India', 'Jordan'],
	North_America: ['Canada', 'USA'],
	South_America: ['Peru', 'Brazil'],
	Oceania: ['Australia'],
	Africa: [],
	Antarctica: ['Antarctica'],
};

export const getContinent = (country) => {
	for (const [continent, countries] of Object.entries(CONTINENT_MAP)) {
		if (countries.includes(country)) return continent;
	}
	return 'Other';
};
