import { request } from '../utils';
import { setUser } from './set-user';

export const saveUserAsync = (newUserData) => (dispatch) =>
	request('/user', 'PATCH', newUserData).then((updatedUser) => {
		dispatch(setUser(updatedUser.data));

		return updatedUser.data;
	});
