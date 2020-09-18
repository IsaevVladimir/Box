import request from '../utils/request';

export function fetch(payload) {
  return request('/api/check', { method: 'POST', body: payload });
}
