import { request } from '../utils';
import { setTravelData } from './set-travel-data';

export const moveDreamToTravelsAsync = (id) => async (dispatch) => {
	try {
		const updatedTravel = await request('/travel/from-dream', 'POST', { id });
		dispatch(setTravelData(updatedTravel.data));
		return updatedTravel.data;
	} catch (error) {
		throw error;
	}
};
