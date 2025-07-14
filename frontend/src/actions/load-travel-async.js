import { request } from '../utils';
import { setTravelData } from './set-travel-data';

export const LoadTravelAsync = (travelId) => (dispatch) =>
	request(`/travel/${travelId}`).then((travelData) => {
		if (travelData.data) {
			dispatch(setTravelData(travelData.data));
		}
		return travelData;
	});
