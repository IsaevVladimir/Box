import React, {useState, useMemo, useCallback} from 'react';
import { connect } from 'dva';
import { Table, Menu, Dropdown, Icon } from 'antd';
import isNil from 'lodash/isNil';
import get from 'lodash/get';
import find from 'lodash/find';
import eq from 'lodash/eq';

import ControlPanel from './ControlPanel';
import MapContent from './MapContent';
import EditModal from './EditModal';

import { filterArrayBySearchValue } from '../../../selectors/array'

const CheckContent = ({ dataSource, currency, categories, removeCheck }) => {
  const [searchValue, setSearchValue] = useState('');
  const [editCheck, setEditCheck] = useState(null);

  const openModal = useCallback((id = null, coordinates = null) => {
    setEditCheck({ id, coordinates });
  }, []);
  const closeModal = useCallback(() => {
    setEditCheck(null);
  }, []);

  const renderActionColumn = useCallback((id) => {
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
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: categoryId => isNil(categoryId) ? '-' : get(find(categories, x => eq(categoryId, get(x, 'id'))), 'name')
    },
    { title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price, row) => `${price} ${get(currency, `[${get(row, 'currency', 0)}]`)}`},
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
      <Table rowKey='id' style={{ width: '100%' }} columns={columns} dataSource={normalizeDataSource} size='middle' />
      <EditModal closeModal={closeModal} check={editCheck} />
    </div>
  );
}

export default connect(({ check, checkCategory }) => ({
  dataSource: check.list,
  currency: check.currency,
  categories: checkCategory.list
}), dispatch => ({
  removeCheck: id => dispatch({type: 'check/remove', id})
}))(CheckContent);
