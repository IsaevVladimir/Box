import React from 'react';
import moment from 'moment'
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
const checks = [
  {
    Id: 1,
    Name: 'Check 1',
    Price: 100,
    Dt: moment(),
    Location: 'New York No. 1 Lake Park',
    CategoryId: null
  },
  {
    Id: 2,
    Name: 'Check 2',
    Price: 200,
    Dt: moment(),
    Location: 'New York No. 1 Lake Park',
    CategoryId: 1
  },
  {
    Id: 3,
    Name: 'Check 3',
    Price: 300,
    Dt: moment(),
    Location: 'New York No. 1 Lake Park',
    CategoryId: 2
  },
  {
    Id: 4,
    Name: 'Check 4',
    Price: 400,
    Dt: moment(),
    Location: 'New York No. 1 Lake Park',
    CategoryId: 1
  },
  {
    Id: 5,
    Name: 'Check 5',
    Price: 500,
    Dt: moment(),
    Location: 'New York No. 1 Lake Park',
    CategoryId: 3
  },
];

const CheckTree = () => {

  return (
    <Table
      style={{ width: '100%' }}
      columns={columns}
      dataSource={checks}
    />
  );
}

export default CheckTree;
