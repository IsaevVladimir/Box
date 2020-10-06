import isArray from 'lodash/isArray'
import hasIn from 'lodash/hasIn'
import get from 'lodash/get'
import eq from 'lodash/eq'
import map from 'lodash/map'
import filter from 'lodash/filter'
import isBoolean from 'lodash/isBoolean'
import isObject from 'lodash/isObject'
import isNil from 'lodash/isNil';
import uniqBy from 'lodash/uniqBy';

import {connect, getRowList, addRow, updateRow, removeRow, getCellList, addCell, updateCell, removeCell} from '../services/table'

export default {
  namespace: 'table',

  state: {
    connection: null,
    rows: [],
    cells: []
  },

  effects: {
    *connect(_, {call, put}) {
      const response = yield call(connect);
      if (isObject(response)) {
        yield put({type: 'saveConnect', payload: response});
        return response;
      }
    },

    *fetchRowList(_, {call, put, select}) {
      const connection = yield select(state => state.table.connection);
      const response = yield call(getRowList, connection);
      if (isArray(response)) {
        for (let i = 0; i < response.length; i++) {
          yield put({ type: 'fetchCellList', payload: get(response, `[${i}].id`)});
        }
        yield put({type: 'saveRows', payload: response});
      }
    },
    *addRow({payload}, {call, put, select}) {
      const connection = yield select(state => state.table.connection);
      const response = yield call(addRow, connection, payload);
      if (hasIn(response, 'id')) {
        yield put({type: 'insertIntoRowList', payload: response});
      }
    },
    *updateRow({payload}, {call, put, select}) {
      const connection = yield select(state => state.table.connection);
      const response = yield call(updateRow, connection, payload);
      if (hasIn(response, 'id')) {
        yield put({type: 'updateInRowList', payload: response});
      }
    },
    *removeRow({payload}, {call, put, select}) {
      const connection = yield select(state => state.table.connection);
      const response = yield call(removeRow, connection, payload);
      if (isBoolean(response) && response) {
        yield put({type: 'removeFromRowList', payload: payload});
      }
    },

    *fetchCellList({ payload }, {call, put, select}) {
      const connection = yield select(state => state.table.connection);
      const response = yield call(getCellList, { connection, rowId: payload });
      if (isArray(response)) {
        yield put({type: 'saveCells', payload: response});
      }
    },
    *addCell({payload}, {call, put, select}) {
      const connection = yield select(state => state.table.connection);
      const response = yield call(addCell, connection, payload);
      if (hasIn(response, 'id')) {
        yield put({type: 'insertIntoCellList', payload: response});
      }
    },
    *updateCell({payload}, {call, put, select}) {
      const connection = yield select(state => state.table.connection);
      const response = yield call(updateCell, connection, payload);
      if (hasIn(response, 'id')) {
        yield put({type: 'updateInCellList', payload: response});
      }
    },
    *removeCell({payload}, {call, put, select}) {
      const connection = yield select(state => state.table.connection);
      const response = yield call(removeCell, connection, payload);
      if (isBoolean(response) && response) {
        yield put({type: 'removeFromCellList', payload: payload});
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
    saveConnect(state, action) {
      return {...state, connection: action.payload};
    },

    saveRows(state, action) {
      return {...state, rows: action.payload};
    },
    insertIntoRowList(state, action) {
      return {...state, rows: [...state.rows, action.payload]};
    },
    updateInRowList(state, action) {
      return {
        ...state,
        rows: map(state.rows,
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
        rows: filter(state.rows, x => !eq(get(x, 'id'), get(action, 'payload')))
      };
    },

    saveCells(state, action) {
      return {...state, cells: uniqBy([...state.cells, ...action.payload], x => x.id)};
    },
    insertIntoCellList(state, action) {
      return {...state, cells: [...state.cells, action.payload]};
    },
    updateInCellList(state, action) {
      return {
        ...state,
        cells: map(state.cells,
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
        cells: filter(state.cells, x => !eq(get(x, 'id'), get(action, 'payload')))
      };
    }
  },

  subscriptions: {
    setup({history, dispatch}) {
      return history.listen(({pathname}) => {
        if (pathname === '/Table') {
          const connection = dispatch({type: 'connect'});
          connection.then(connect => {
            if (isNil(connect))
              return;

            connect.start()
              .then(() => {
                dispatch({type: 'fetchRowList'});

                connect.on('AddRow', row => {
                  dispatch({type: 'addRowFromSub', payload: row});
                });
                connect.on('UpdateRow', row => {
                  dispatch({type: 'updateRowFromSub', payload: row});
                });
                connect.on('RemoveRow', id => {
                  dispatch({type: 'removeRowFromSub', payload: id});
                });

                connect.on('AddCell', cell => {
                  dispatch({type: 'addCellFromSub', payload: cell});
                });
                connect.on('UpdateCell', cell => {
                  dispatch({type: 'updateCellFromSub', payload: cell});
                });
                connect.on('RemoveCell', id => {
                  dispatch({type: 'removeCellFromSub', payload: id});
                });
              })
              .catch(e => console.log('connection error', e));
          }).catch(e => console.log('connection error', e))
        }
      });
    },
  }
};
