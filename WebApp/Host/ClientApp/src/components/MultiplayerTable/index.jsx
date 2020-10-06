import React, { useMemo } from 'react';
import {connect} from 'dva';
import {Table} from 'antd';

import EditableCell from './components/EditableCell'

import { normalizeDataProps } from './utils'

const MultiplayerTable = ({ rows, cells, addRow, addCell }) => {
  const { columns, ...dataProps } = useMemo(() => {
    return normalizeDataProps(rows, cells, addRow, addCell);
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
        handleSave: (cell) => {
          console.log('handleSave', cell);
        },
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
  addRow: row => dispatch({type: 'table/addRow', payload: row}),
  addCell: cell => dispatch({type: 'table/addCell', payload: cell}),
}))(MultiplayerTable);
