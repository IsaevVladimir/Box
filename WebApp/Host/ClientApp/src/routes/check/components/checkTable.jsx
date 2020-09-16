import React from 'react';
import { connect } from 'dva';

import { Table } from 'antd'

const columns = [
  { title: 'Name', dataIndex: 'Name', key: 'Name' },
  { title: 'Price', dataIndex: 'Price', key: 'Price' },
  { title: 'Dt', dataIndex: 'Dt', key: 'Dt' },
  { title: 'Location', dataIndex: 'Location', key: 'Location' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];

const CheckTable = ({ list }) => {

  return (
    <Table
      style={{ width: '100%' }}
      columns={columns}
      dataSource={list}
    />
  );
}

export default connect(({ check }) => ({
  list: check.list
}))(CheckTable);
