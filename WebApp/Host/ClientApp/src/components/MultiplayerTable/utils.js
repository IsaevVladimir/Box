import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import max from 'lodash/max';
import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import get from 'lodash/get';

export const normalizeTableData = (rows, cells) => {
  const groupedCells = groupBy(cells, x => x.rowId);
  const maxCellInRowCount = max(map(groupedCells, x => x.length));

  const columns = [];
  for (let i = 0; i < maxCellInRowCount; i++) {
    columns.push({ title: `Column${i}`, dataIndex: `Column${i}`, key: i.toString(36) })
  }

  const dataSource = [];
  forEach(rows, ({id}) => {
    const sourceItem = { key: id };
    const rowCells = filter(cells, x => x.rowId === id);
    for (let i = 0; i < maxCellInRowCount; i++) {
      sourceItem[`Column${i}`] = get(rowCells, `[${i}]value`, '');
    }
    dataSource.push(sourceItem);
  });

  return [columns, dataSource];
}
