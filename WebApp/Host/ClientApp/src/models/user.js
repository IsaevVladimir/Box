import noop from 'lodash/noop'
import { queryCurrent, signIn, signUp } from '../services/user'

export default {
  namespace: 'user',

  state: {
    current: null
  },

  effects: {
    *signIn({ payload }, { call, put }) {
      const response = yield call(signIn, payload);
      yield put({ type: 'saveCurrent', payload: response });
    },
    *signUp({ payload }, { call, put }) {
      const response = yield call(signUp, payload);
      yield put({ type: 'saveCurrent', payload: response });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({ type: 'saveCurrent', payload: response });
    },
  },

  reducers: {
    saveCurrent(state, action) {
      return { ...state, current: action.payload };
    },
  },

  subscriptions: {
    async setup({ dispatch }) {
      try {
        await dispatch({ type: 'refreshCurrent' });
      } catch (e) {
        noop();
      }

      let timeOut = 0;
      const refresh = async () => {
        clearTimeout(timeOut);
        try {
          await dispatch({ type: 'refreshCurrent' });
        } catch (e) {
          noop();
        }
        timeOut = setTimeout(refresh, 60000);
      };
      timeOut = setTimeout(refresh, 60000);
    },
  }
};
