import {HubConnectionBuilder} from '@microsoft/signalr';
import noop from 'lodash/noop';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

const actionWrapper = async (connection, action, props = {}) => {
  if (connection.connectionStarted) {
    try {
      if (isNil(props) || isEmpty(props)) {
        return await connection.invoke(action);
      } else {
        return await connection.invoke(action, ...Object.values(props));
      }
    } catch (e) {
      console.log('e', e);
      noop(e);
    }
  }
}

export function connect() {
  return new HubConnectionBuilder().withUrl('https://localhost:5001/tablehub').withAutomaticReconnect().build();
}

export async function getRowList(connection) {
  return await actionWrapper(connection, 'GetRowList');
}
export async function addRow(connection, row) {
  return await actionWrapper(connection, 'AddRow', { row });
}
export async function updateRow(connection, row) {
  return await actionWrapper(connection, 'UpdateRow', { row });
}
export async function removeRow(connection, id) {
  return await actionWrapper(connection, 'RemoveRow', { id });
}

export async function getCellList({ connection, rowId }) {
  return await actionWrapper(connection, 'GetCellList', { rowId });
}
export async function addCell(connection, cell) {
  return await actionWrapper(connection, 'AddCell', { cell });
}
export async function updateCell(connection, cell) {
  return await actionWrapper(connection, 'UpdateCell', { cell });
}
export async function removeCell(connection, id) {
  return await actionWrapper(connection, 'RemoveCell', { id });
}

