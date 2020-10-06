import React from 'react';
import {Button} from 'antd';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import max from 'lodash/max';
import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import get from 'lodash/get';

export const normalizeDataProps = (rows, cells, addRow, addCell) => {
  const groupedCells = groupBy(cells, x => x.rowId);
  const maxCellNumberInRowCount = max(map(groupedCells, x => max(map(x, c => c.number))));

  const columns = [];
  for (let i = 0; i < maxCellNumberInRowCount; i++) {
    columns.push({ title: `Col${i}`, dataIndex: `Column${i}`, key: i.toString(36), editable: true })
  }

  const dataSource = [];
  forEach(rows, ({id, number}) => {
    const sourceItem = { key: id, number };
    const rowCells = filter(cells, x => x.rowId === id);
    for (let i = 0; i < maxCellNumberInRowCount; i++) {
      const cell = get(rowCells, `[${i}]`);
      sourceItem[`Column${i}`] =
        {
          id: get(cell, 'id', undefined),
          number: i,
          rowId: id,
          value: get(cell, 'value', '')
        };
    }
    dataSource.push(sourceItem);
  });

  const addCellOnClick = () => {
    addCell({ rowId: rows[0].id, number: maxCellNumberInRowCount + 1, value: '' });
  }

  const addRowOnClick = () => {
    addRow({ number: dataSource.length + 1 });
  }

  const addCol = {
    key: 'addColumn',
    fixed: 'right',
    width: '50px',
    title: <Button onClick={addCellOnClick} type='primary' icon='plus' />
  }
  const emptyCol = {
    key: 'number',
    dataIndex: 'number',
    fixed: 'left',
    width: '50px',
    title: ''
  }

  return {
    columns: [emptyCol, ...columns, addCol],
    dataSource,
    bordered: true,
    size: 'small',
    footer: () => <Button onClick={addRowOnClick} type='primary' icon='plus' />,
    title: () => 'Многопользовательская таблица: CRUD строк/колонок/ячеек, запрет одновременного редактирования ячейки. SignalR'
  };
}
