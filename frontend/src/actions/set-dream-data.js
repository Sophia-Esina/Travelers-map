import { ACTION_TYPE } from './action-type';

export const setDreamData = (dreamData) => ({
	type: ACTION_TYPE.SET_DREAM_DATA,
	payload: dreamData,
});
