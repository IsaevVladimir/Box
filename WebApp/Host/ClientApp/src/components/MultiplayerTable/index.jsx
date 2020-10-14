import React, { useMemo } from 'react';
import {connect} from 'dva';
import {Table} from 'antd';
import has from 'lodash/has';
import isNumber from 'lodash/isNumber';

import EditableCell from './components/EditableCell'

import { normalizeDataProps } from './utils'

const MultiplayerTable = ({ rows, cells, updateRow, updateCell }) => {
  const { columns, ...dataProps } = useMemo(() => {
    return normalizeDataProps(rows, cells, updateRow, updateCell);
  }, [rows, cells]);

  const cols = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: updateCell,
      }),
    };
  });

  return (
    <Table
      {...dataProps}
      columns={cols}
      components={{ body: { cell: EditableCell } }}
    />
  );
};

export default connect(({ table }) => ({
  rows: table.rows,
  cells: table.cells
}), dispatch => ({
  updateRow: row => {
    if (has(row, 'id') && isNumber(row.id)) {
      dispatch({type: 'table/updateRow', payload: row})
    } else {
      dispatch({type: 'table/addRow', payload: row})
    }
  },
  updateCell: cell => {
    console.log('cell', cell);
    if (has(cell, 'id') && isNumber(cell.id)) {
      dispatch({type: 'table/updateCell', payload: cell})
    } else {
      dispatch({type: 'table/addCell', payload: cell})
    }
  },
}))(MultiplayerTable);
