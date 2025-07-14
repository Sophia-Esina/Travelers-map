const CONTINENT_MAP = {
	Europe: ['Germany', 'France', 'Spain', 'Italy', 'Sweden', 'Russia', 'Romania'],
	Asia: ['Japan', 'India', 'Jordan'],
	NorthAmerica: ['Canada', 'USA'],
	SouthAmerica: ['Peru', 'Brazil'],
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
