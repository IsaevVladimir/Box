import request from '../utils/request';

export function fetch({ payload }) {
  return request('/api/checkCategory', { method: 'POST', body: payload });
}
