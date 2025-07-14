import { request } from '../utils';
import { setDreamData } from './set-dream-data';

export const LoadDreamAsync = (dreamId) => (dispatch) =>
	request(`/dream/${dreamId}`).then((dreamData) => {
		if (dreamData.data) {
			dispatch(setDreamData(dreamData.data));
		}
		return dreamData;
	});
