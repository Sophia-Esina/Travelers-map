import { ACTION_TYPE } from '../actions';

const InitialDreamState = {
	id: '',
	title: '',
	imageUrl: '',
	country: '',
	city: '',
	date: '',
	notes: '',
};

export const dreamReducer = (state = InitialDreamState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_DREAM_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_DREAM_DATA:
			return InitialDreamState;

		default:
			return state;
	}
};
