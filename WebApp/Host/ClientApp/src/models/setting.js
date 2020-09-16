import { fetch } from '../services/setting'
import moment from 'moment';
import get from 'lodash/get';

export default {
  namespace: 'setting',

  state: {
    priceRange: {
      max: 300,
      min: 0
    },
    dateRange: {
      max: moment(),
      min: moment()
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetch, payload);
      yield put({ type: 'save', payload: response });
    },
  },

  reducers: {
    save(state, action) {
      return {
        priceRange: {
          max: get(action, 'payload.priceRange.max', state.priceRange.max),
          min: get(action, 'payload.priceRange.min', state.priceRange.min)
        },
        dateRange: {
          max: get(action, 'payload.dateRange.max', state.dateRange.max),
          min: get(action, 'payload.dateRange.min', state.dateRange.min)
        },
      };
    },
  }
};
