import { actionWrapper } from '../../utils/socketWrapper';

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

export async function updateRows(connection, rows) {
  return await actionWrapper(connection, 'UpdateRows', { rows });
}
