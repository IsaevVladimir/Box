import isArray from 'lodash/isArray'
import hasIn from 'lodash/hasIn'
import get from 'lodash/get'
import eq from 'lodash/eq'
import map from 'lodash/map'
import filter from 'lodash/filter'
import isBoolean from 'lodash/isBoolean'

import {getRowList, addRow, updateRow, removeRow, updateRows} from '../../services/table/row'

export default {
  namespace: 'row',

  state: {
    list: [],
  },

  effects: {
    *fetchRowList(_, {call, put, select}) {
      const connection = yield select(state => state.tableConnection.connection);
      const response = yield call(getRowList, connection);
      if (isArray(response)) {
        for (let i = 0; i < response.length; i++) {
          yield put({ type: 'cell/fetchCellList', payload: get(response, `[${i}].id`)});
        }
        yield put({type: 'saveRows', payload: response});
      }
    },
    *addRow({payload}, {call, put, select}) {
      const connection = yield select(state => state.tableConnection.connection);
      const response = yield call(addRow, connection, payload);
      if (hasIn(response, 'id')) {
        yield put({type: 'insertIntoRowList', payload: response});
      }
    },
    *updateRow({payload}, {call, put, select}) {
      const connection = yield select(state => state.tableConnection.connection);
      const response = yield call(updateRow, connection, payload);
      if (hasIn(response, 'id')) {
        yield put({type: 'updateInRowList', payload: response});
      }
    },
    *removeRow({payload}, {call, put, select}) {
      console.log('payload', payload);
      const connection = yield select(state => state.tableConnection.connection);
      const response = yield call(removeRow, connection, payload);
      console.log('response', response);
      if (isBoolean(response) && response) {
        yield put({type: 'removeFromRowList', payload: payload});
      }
    },

    *updateRows({payload}, {call, put, select}) {
      const connection = yield select(state => state.tableConnection.connection);
      const response = yield call(updateRows, connection, payload);
      if (hasIn(response, 'id')) {
        yield put({type: 'updateInRowList', payload: response});
      }
    },

    *addRowFromSub({payload}, {put}) {
      yield put({type: 'insertIntoRowList', payload: payload});
    },
    *updateRowFromSub({payload}, {put}) {
      yield put({type: 'updateInRowList', payload: payload});
    },
    *removeRowFromSub({payload}, {put}) {
      yield put({type: 'removeFromRowList', payload: payload});
    },
  },

  reducers: {
    saveRows(state, action) {
      return {...state, list: action.payload};
    },
    insertIntoRowList(state, action) {
      return {...state, list: [...state.list, action.payload]};
    },
    updateInRowList(state, action) {
      return {
        ...state,
        list: map(state.list,
          x => {
            if (eq(get(x, 'id'), get(action, 'payload.id'))) {
              return action.payload;
            }
            return x;
          })
      };
    },
    removeFromRowList(state, action) {
      return {
        ...state,
        list: filter(state.list, x => !eq(get(x, 'id'), get(action, 'payload')))
      };
    },
  },
};
