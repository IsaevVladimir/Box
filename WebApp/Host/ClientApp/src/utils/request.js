import fetch from 'dva/fetch';
import { notification } from 'antd';
import toLower from 'lodash/toLower';

const codeMessage = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  406: 'Not Acceptable',
  410: 'Gone',
  422: 'Misdirected Request',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

const sRouteTimetable = '/api/timetable'; // lowerCase
const sRouteTimetableShift = '/api/timetableshift'; // lowerCase

const checkStatus = (response, errorNotificationIsEnabled) => {
  const { url, status } = response;
  const sUrl = toLower(url);
  if (
    (sUrl.substr(sUrl.indexOf(sRouteTimetable), sRouteTimetable.length) === sRouteTimetable ||
      sUrl.substr(sUrl.indexOf(sRouteTimetableShift), sRouteTimetableShift.length) ===
      sRouteTimetableShift) &&
    status === 400
  ) {
    return response;
  }

  if (url.substr(-11, 11) === 'users/token' && status === 401) {
    return response;
  }

  if (status >= 200 && status < 300) {
    return response;
  }

  const errortext = codeMessage[status] || response.statusText;

  // disable error message when user is unauthorised
  if (status !== 401 && errorNotificationIsEnabled(status)) {
    notification.error({
      message: `ERROR ${status}: ${url}`,
      description: errortext,
    });
  }

  const error = new Error(errortext);
  error.name = status;
  error.response = response;
  throw error;
};

function setAuth(options) {
  const token = localStorage.getItem('token');

  const headers = token
    ? {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    }
    : options.headers;

  return { ...options, headers };
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const defaultOptions = {
    credentials: 'include',
    cacheEnabled: false,
    errorNotificationIsEnabled: () => true,
    checkStatus,
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'PATCH' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  const token = localStorage.getItem('token');
  if (token) {
    newOptions.headers = {
      Authorization: `Bearer ${token}`,
      ...newOptions.headers,
    };
  }


  return fetch(url, newOptions)
    .then(response => newOptions.checkStatus(response, newOptions.errorNotificationIsEnabled))
    .then(response => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      if (
        newOptions.method === 'DELETE' ||
        newOptions.method === 'HEAD' ||
        response.status === 204
      ) {
        return response.text();
      }
      return response.json();
    })
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        /*window.g_app._store.dispatch({
          type: 'login/logout',
        });*/
      }
    });
}
