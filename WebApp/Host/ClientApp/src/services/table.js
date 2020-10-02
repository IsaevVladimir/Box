import {HubConnectionBuilder} from '@microsoft/signalr';
import noop from 'lodash/noop';

const actionWrapper = async (connection, action, props = {}) => {
  if (connection.connectionStarted) {
    try {
      return await connection.invoke(action, ...props);
    } catch (e) {
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


export async function getCellList(connection, rowId) {
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

