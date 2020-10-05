import isArray from 'lodash/isArray'
import hasIn from 'lodash/hasIn'
import get from 'lodash/get'
import eq from 'lodash/eq'
import map from 'lodash/map'
import filter from 'lodash/filter'
import isBoolean from 'lodash/isBoolean'
import isObject from 'lodash/isObject'
import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';

import {connect, getRowList, getCellList, addCell, updateCell, removeCell} from '../services/table'

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

    *fetchCellList({ payload }, {call, put, select}) {
      const connection = yield select(state => state.table.connection);
      const response = yield call(getCellList, { connection, rowId: payload });
      if (isArray(response)) {
        yield put({type: 'saveCells', payload: response});
      }
    },
    *addCell({cell}, {call, put, select}) {
      const connection = yield select(state => state.table.connection);
      const response = yield call(addCell, connection, cell);
      if (hasIn(response, 'id')) {
        yield put({type: 'insertIntoCellList', payload: response});
      }
    },
    *updateCell({cell}, {call, put, select}) {
      const connection = yield select(state => state.table.connection);
      const response = yield call(updateCell, connection, cell);
      if (hasIn(response, 'id')) {
        yield put({type: 'updateInCellList', payload: response});
      }
    },
    *removeCell({id}, {call, put, select}) {
      const connection = yield select(state => state.table.connection);
      const response = yield call(removeCell, connection, id);
      if (isBoolean(response) && response) {
        yield put({type: 'removeFromCellList', payload: id});
      }
    },


    *addRowFromSub({row}, {put}) {
      yield put({type: 'insertIntoRowList', payload: row});
    },
    *removeRowFromSub({id}, {put}) {
      yield put({type: 'removeFromRowList', payload: id});
    },

    *addCellFromSub({cell}, {put}) {
      yield put({type: 'insertIntoCellList', payload: cell});
    },
    *updateCellFromSub({cell}, {put}) {
      yield put({type: 'updateInCellList', payload: cell});
    },
    *removeCellFromSub({id}, {put}) {
      yield put({type: 'removeFromCellList', payload: id});
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
      return {...state, rows: [...state.list, action.payload]};
    },
    removeFromRowList(state, action) {
      return {
        ...state,
        rows: filter(state.list, x => !eq(get(x, 'id'), get(action, 'payload')))
      };
    },

    saveCells(state, action) {
      return {...state, cells: [...state.cells, ...action.payload]};
    },
    insertIntoCellList(state, action) {
      return {...state, cells: [...state.list, action.payload]};
    },
    updateInCellList(state, action) {
      return {
        ...state,
        cells: map(state.list,
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
        cells: filter(state.list, x => !eq(get(x, 'id'), get(action, 'payload')))
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
              .catch(e => console.log('connection error 2', e));
          }).catch(e => console.log('connection error', e))
        }
      });
    },
  }
};
