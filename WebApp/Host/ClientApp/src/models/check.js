import isArray from 'lodash/isArray'
import hasIn from 'lodash/hasIn'
import get from 'lodash/get'
import eq from 'lodash/eq'
import map from 'lodash/map'
import filter from 'lodash/filter'
import { fetch, add, update, remove } from '../services/check'

export default {
  namespace: 'check',

  state: {
    list: [],
    currency: ['USD', 'EUR', 'RUB']
  },

  effects: {
    *fetch({payload}, {call, put}) {
      const response = yield call(fetch, payload);
      if (isArray(response)) {
        yield put({type: 'saveList', payload: response});
      }
    },

    *add({payload}, {call, put}) {
      const response = yield call(add, payload);
      if (hasIn(response, 'id')) {
        yield put({type: 'insertIntoList', payload: response});
      }
    },

    *update({payload}, {call, put}) {
      const response = yield call(update, payload);
      if (hasIn(response, 'id')) {
        yield put({type: 'updateInList', payload: response});
      }
    },

    *remove({id}, {call, put}) {
      const response = yield call(remove, id);
      if (response) {
        yield put({type: 'removeFromList', payload: id});
      }
    }
  },

  reducers: {
    saveList(state, action) {
      return {...state, list: action.payload};
    },
    insertIntoList(state, action) {
      return {...state, list: [ ...state.list, action.payload ]};
    },
    updateInList(state, action) {
      return {...state,
        list: map(state.list,
          x => {
            if (eq(get(x, 'id'), get(action, 'payload.id'))) {
              return action.payload;
            }
            return x;
          })
      };
    },
    removeFromList(state, action) {
      return {...state,
        list: filter(state.list, x => !eq(get(x, 'id'), get(action, 'payload')))
      };
    }
  }
};
