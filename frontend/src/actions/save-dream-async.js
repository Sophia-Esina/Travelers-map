import { request } from '../utils';
import { setDreamData } from './set-dream-data';

export const saveDreamAsync = (dreamData) => (dispatch) => {
	const { id, ...rest } = dreamData;

	const saveRequest = id
		? request(`/dream/${id}`, 'PATCH', rest)
		: request('/dream', 'POST', rest);

	return saveRequest.then((response) => {
		const data = { ...response.data, id: response.data._id };
		dispatch(setDreamData(data));
		return data;
	});
};
