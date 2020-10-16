import isObject from 'lodash/isObject'
import isNil from 'lodash/isNil';

import {connect} from '../../services/table/tableConnection'

export default {
  namespace: 'tableConnection',

  state: {
    connection: null,
  },

  effects: {
    *connect(_, {call, put}) {
      const response = yield call(connect);
      if (isObject(response)) {
        yield put({type: 'saveConnect', payload: response});
        return response;
      }
    }
  },

  reducers: {
    saveConnect(state, action) {
      return {...state, connection: action.payload};
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
                dispatch({type: 'row/fetchRowList'});

                connect.on('AddRow', row => {
                  dispatch({type: 'row/addRowFromSub', payload: row});
                });
                connect.on('UpdateRow', row => {
                  dispatch({type: 'row/updateRowFromSub', payload: row});
                });
                connect.on('RemoveRow', id => {
                  dispatch({type: 'row/removeRowFromSub', payload: id});
                });
                connect.on('AddCell', cell => {
                  dispatch({type: 'cell/addCellFromSub', payload: cell});
                });
                connect.on('UpdateCell', cell => {
                  dispatch({type: 'cell/updateCellFromSub', payload: cell});
                });
                connect.on('RemoveCell', id => {
                  dispatch({type: 'cell/removeCellFromSub', payload: id});
                });
              })
              .catch(e => console.log('connection error', e));
          }).catch(e => console.log('connection error', e))
        }
      });
    },
  }
};
