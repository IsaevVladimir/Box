import React from 'react';
import {Button} from 'antd';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import max from 'lodash/max';
import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import get from 'lodash/get';
import find from 'lodash/find';

import EditableColumn from './components/EditableColumn';
import EditableRow from './components/EditableRow';

export const normalizeDataProps = (rows, cells, updateCell) => {
  const groupedCells = groupBy(cells, x => x.rowId);
  const maxCellNumberInRowCount = max(map(groupedCells, x => max(map(x, c => c.number))));

  const columns = [];
  for (let i = 0; i < maxCellNumberInRowCount; i++) {
    columns.push({ title: <EditableColumn title={`Col${i}`} />,
      dataIndex: `Column${i}.value`,
      key: i.toString(36),
      editable: true })
  }

  const dataSource = [];
  forEach(rows, ({id, number}) => {
    const sourceItem = { id, key: id, number };
    const rowCells = filter(cells, x => x.rowId === id);
    for (let i = 0; i < maxCellNumberInRowCount; i++) {
      const cell = find(rowCells, c => c.number === i);
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
    updateCell({ rowId: rows[0].id, number: maxCellNumberInRowCount + 1, value: '' });
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
    title: '',
    render: (title,row) => <EditableRow title={title} row={row} />
  }

  return {
    columns: [emptyCol, ...columns, addCol],
    pagination: false,
    dataSource,
    bordered: true,
    size: 'small'
  };
}

export const normalizeDataIndex = (dataIndex) => {
  return dataIndex.substr(0, dataIndex.length - 6);
}
