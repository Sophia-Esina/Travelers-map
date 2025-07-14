const initialMapState = {
	markers: JSON.parse(localStorage.getItem('markers')) || [],
};

export const mapReducer = (state = initialMapState, action) => {
	switch (action.type) {
		case 'ADD_MARKER':
			const updated = [...state.markers, action.payload];
			localStorage.setItem('markers', JSON.stringify(updated));
			return { ...state, markers: updated };
		case 'SET_MARKERS':
			localStorage.setItem('markers', JSON.stringify(action.payload));
			return { ...state, markers: action.payload };
		default:
			return state;
	}
};
