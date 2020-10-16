import { fetch } from '../../services/check/checkCategory'

export default {
  namespace: 'checkCategory',

  state: {
    list: []
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fetch);
      yield put({ type: 'saveList', payload: response });
    },
  },

  reducers: {
    saveList(state, action) {
      return { ...state, list: action.payload };
    },
  }
};
