import request from '../utils/request';

export function queryCurrent() {
  return request(`/api/Authorization/me`);
}

export function signIn({ credential: { login, password } }) {
  return request(`/api/Authorization?login=${login}&password=${password}`);
}

export function signUp({ payload }) {
  return request('/api/Authorization', { method: 'PUT', body: payload });
}
