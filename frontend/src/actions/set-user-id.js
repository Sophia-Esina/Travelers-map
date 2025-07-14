import { ACTION_TYPE } from './action-type';

export const setUserId = (id) => ({
	type: ACTION_TYPE.SET_USER_ID,
	payload: id,
});
