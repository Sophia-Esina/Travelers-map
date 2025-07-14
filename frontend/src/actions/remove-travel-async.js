import { request } from '../utils';

export const removeTravelAsync = (id) => () => request(`/travel/${id}`, 'DELETE');
