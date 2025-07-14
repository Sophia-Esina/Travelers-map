import { request } from '../utils';

export const removeDreamAsync = (id) => () => request(`/dream/${id}`, 'DELETE');
