import { ACTION_TYPE } from '../actions';

const InitialTravelState = {
	id: '',
	userId: '',
	title: '',
	country: '',
	city: '',
	notes: '',
	imageUrl: '',
	date: '',
	published: false,
};

export const travelReducer = (state = InitialTravelState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_TRAVEL_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_TRAVEL_DATA:
			return InitialTravelState;

		default:
			return state;
	}
};
