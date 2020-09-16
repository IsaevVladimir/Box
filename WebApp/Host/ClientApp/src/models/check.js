import { fetch } from '../services/check'
import moment from 'moment';

export default {
  namespace: 'check',

  state: {
    list: [{
      Id: 1,
      Name: 'Check 1',
      Price: 100,
      Dt: moment(),
      Location: 'New York No. 1 Lake Park',
      CategoryId: null
    },
      {
        Id: 2,
        Name: 'Check 2',
        Price: 200,
        Dt: moment(),
        Location: 'New York No. 1 Lake Park',
        CategoryId: 1
      },
      {
        Id: 3,
        Name: 'Check 3',
        Price: 300,
        Dt: moment(),
        Location: 'New York No. 1 Lake Park',
        CategoryId: 2
      },
      {
        Id: 4,
        Name: 'Check 4',
        Price: 400,
        Dt: moment(),
        Location: 'New York No. 1 Lake Park',
        CategoryId: 1
      },
      {
        Id: 5,
        Name: 'Check 5',
        Price: 500,
        Dt: moment(),
        Location: 'New York No. 1 Lake Park',
        CategoryId: 3
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
