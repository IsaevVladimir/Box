import React, { useMemo } from 'react';
import {connect} from 'dva';
import {Table} from 'antd';

import { normalizeTableData } from './utils'

const MultiplayerTable = ({ rows, cells }) => {
  const [columns, dataSource] = useMemo(() => {
    return normalizeTableData(rows, cells);
  }, [rows, cells]);

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
    />
  );
};

export default connect(({ table }) => ({
  rows: table.rows,
  cells: table.cells
}))(MultiplayerTable);
