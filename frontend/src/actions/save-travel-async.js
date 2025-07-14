import { setTravelData } from './set-travel-data';
import { request } from '../utils';

export const saveTravelAsync = (travelData) => (dispatch) => {
	const { id, ...rest } = travelData;

	const saveRequest = id
		? request(`/travel/${id}`, 'PATCH', rest)
		: request('/travel', 'POST', rest);

	return saveRequest.then((response) => {
		const data = { ...response.data, id: response.data._id };
		dispatch(setTravelData(data));
		return data;
	});
};
