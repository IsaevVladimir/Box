import {fetch} from '../services/check'
import isArray from 'lodash/isArray'

export default {
  namespace: 'check',

  state: {
    list: []
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(fetch, payload);
      if (isArray(response)) {
        yield put({type: 'saveList', payload: response});
      }
    },
  },

  reducers: {
    saveList(state, action) {
      return {...state, list: action.payload};
    },
  }
};
