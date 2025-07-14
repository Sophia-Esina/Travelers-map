import { ACTION_TYPE } from './action-type';

export const addMarker = (marker) => ({
	type: ACTION_TYPE.ADD_MARKER,
	payload: marker,
});
