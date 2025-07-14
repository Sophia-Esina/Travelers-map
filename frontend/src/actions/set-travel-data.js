import { ACTION_TYPE } from './action-type';

export const setTravelData = (travelData) => ({
	type: ACTION_TYPE.SET_TRAVEL_DATA,
	payload: travelData,
});
