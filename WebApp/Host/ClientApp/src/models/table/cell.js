import isArray from 'lodash/isArray'
import hasIn from 'lodash/hasIn'
import get from 'lodash/get'
import eq from 'lodash/eq'
import map from 'lodash/map'
import filter from 'lodash/filter'
import isBoolean from 'lodash/isBoolean'
import uniqBy from 'lodash/uniqBy';

import {getCellList, addCell, updateCell, removeCell} from '../../services/table/cell'

export default {
  namespace: 'cell',

  state: {
    list: []
  },

  effects: {
    *fetchCellList({ payload }, {call, put, select}) {
      const connection = yield select(state => state.tableConnection.connection);
      const response = yield call(getCellList, { connection, rowId: payload });
      if (isArray(response)) {
        yield put({type: 'saveCells', payload: response});
      }
    },
    *addCell({payload}, {call, put, select}) {
      const connection = yield select(state => state.tableConnection.connection);
      const response = yield call(addCell, connection, payload);
      if (hasIn(response, 'id')) {
        yield put({type: 'insertIntoCellList', payload: response});
      }
    },
    *updateCell({payload}, {call, put, select}) {
      const connection = yield select(state => state.tableConnection.connection);
      const response = yield call(updateCell, connection, payload);
      if (hasIn(response, 'id')) {
        yield put({type: 'updateInCellList', payload: response});
      }
    },
    *removeCell({payload}, {call, put, select}) {
      const connection = yield select(state => state.tableConnection.connection);
      const response = yield call(removeCell, connection, payload);
      if (isBoolean(response) && response) {
        yield put({type: 'removeFromCellList', payload: payload});
      }
    },


    *addCellFromSub({payload}, {put}) {
      yield put({type: 'insertIntoCellList', payload: payload});
    },
    *updateCellFromSub({payload}, {put}) {
      yield put({type: 'updateInCellList', payload: payload});
    },
    *removeCellFromSub({payload}, {put}) {
      yield put({type: 'removeFromCellList', payload: payload});
    },
  },

  reducers: {
    saveCells(state, action) {
      return {...state, list: uniqBy([...state.list, ...action.payload], x => x.id)};
    },
    insertIntoCellList(state, action) {
      return {...state, list: [...state.list, action.payload]};
    },
    updateInCellList(state, action) {
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
    removeFromCellList(state, action) {
      return {
        ...state,
        list: filter(state.list, x => !eq(get(x, 'id'), get(action, 'payload')))
      };
    }
  }
};
