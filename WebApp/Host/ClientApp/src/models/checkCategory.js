import { fetch } from '../services/checkCategory'

export default {
  namespace: 'checkCategory',

  state: {
    list: [{
      Id: 1,
      Name: 'Category 1',
      ParentId: null
    },
      {
        Id: 2,
        Name: 'Category 2',
        ParentId: 1
      },
      {
        Id: 3,
        Name: 'Category 1',
        ParentId: 2
      }]
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetch, payload);
      yield put({ type: 'saveList', payload: response });
    },
  },

  reducers: {
    saveList(state, action) {
      return { ...state, list: action.payload };
    },
  }
};
