import { ACTION_TYPE } from './action-type';

export const setMarkers = (markers) => ({
	type: ACTION_TYPE.ADD_MARKER,
	payload: markers,
});
