import request from '../utils/request';

export function fetch(payload) {
  return request('/api/check', { method: 'POST', body: payload });
}

export function add(payload) {
  return request('/api/check', { method: 'PUT', body: payload });
}

export function update(payload) {
  return request('/api/check', { method: 'PATCH', body: payload });
}

export function remove(id) {
  return request(`/api/check/${id}`, { method: 'DELETE' });
}
