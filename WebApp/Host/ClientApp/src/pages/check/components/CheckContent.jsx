import React, {useState, useMemo} from 'react';
import { connect } from 'dva';
import { Table, Menu, Dropdown, Icon } from 'antd';

import ControlPanel from './ControlPanel';
import MapContent from './MapContent';
import EditModal from './EditModal';

import { filterArrayBySearchValue } from '../../../selectors/array'

const CheckContent = ({ dataSource, currency, removeCheck }) => {
  const [searchValue, setSearchValue] = useState('');
  const [editCheck, setEditCheck] = useState(null);

  const openModal = (id = null, coordinates = null) => {
    setEditCheck({ id, coordinates });
  }
  const closeModal = () => {
    setEditCheck(null);
  }

  const renderActionColumn = (id) => {
    const menu = (
      <Menu>
        <Menu.Item onClick={() => openModal(id)}>
          <Icon type="edit" /> Edit
        </Menu.Item>

        <Menu.Item onClick={() => removeCheck(id)}>
          <Icon type="delete" /> Delete
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement='bottomLeft'>
        <Icon type="more" />
      </Dropdown>
    );
  }
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Dt', dataIndex: 'payDt', key: 'payDt' },
    {
      dataIndex: 'id',
      key: 'action',
      fixed: 'right',
      width: '10px',
      render: renderActionColumn,
    },
  ];

  const normalizeDataSource = useMemo(() => {
    return filterArrayBySearchValue(dataSource, searchValue);
  }, [searchValue, dataSource])

  return (
    <div>
      <ControlPanel openModal={openModal} setSearchValue={setSearchValue} />
      <MapContent dataSource={normalizeDataSource} currency={currency} openModal={openModal} />
      <Table
        rowKey='id'
        style={{ width: '100%' }}
        columns={columns}
        dataSource={normalizeDataSource}
      />
      <EditModal closeModal={closeModal} check={editCheck} />
    </div>
  );
}

export default connect(({ check }) => ({
  dataSource: check.list,
  currency: check.currency
}), dispatch => ({
  removeCheck: id => dispatch({type: 'check/remove', id})
}))(CheckContent);
