import React, { useMemo } from 'react';
import {connect} from 'dva';
import {Table} from 'antd';
import has from 'lodash/has';
import isNumber from 'lodash/isNumber';

import EditableCell from './components/EditableCell'

import { normalizeDataProps } from './utils'

const MultiplayerTable = ({ rows, cells, updateCell }) => {
  const { columns, ...dataProps } = useMemo(() => {
    return normalizeDataProps(rows, cells, updateCell);
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

export default connect(({ row, cell }) => ({
  rows: row.list,
  cells: cell.list
}), dispatch => ({
  updateCell: cell => {
    if (has(cell, 'id') && isNumber(cell.id)) {
      dispatch({type: 'cell/updateCell', payload: cell})
    } else {
      dispatch({type: 'cell/addCell', payload: cell})
    }
  },
}))(MultiplayerTable);
