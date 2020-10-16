import { actionWrapper } from '../../utils/socketWrapper';

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
