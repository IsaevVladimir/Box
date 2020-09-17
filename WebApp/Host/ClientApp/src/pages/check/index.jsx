import React, { useMemo, useEffect } from 'react';
import { connect } from 'dva';
import { Table } from 'antd'
import get from 'lodash/get'
import { parseQueryParams } from '../../utils/router'

import Main from '../../layouts/baseLayout/main.jsx';
import FilterWrapper from '../../components/Filter/LeftFilter/Wrapper';
import CategoryItem from '../../components/Filter/LeftFilter/Items/CategoryItem';
import DateRangeItem from '../../components/Filter/LeftFilter/Items/DateRangeItem';
import PriceItem from '../../components/Filter/LeftFilter/Items/PriceItem';

import styles from './index.less';

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

function Index({ match, location, dataSource, fetchDataSource }) {

  const search = useMemo(() => {
    return get(location, 'search', '');
  }, [location]);

  useEffect(() => {
    const queryParams = parseQueryParams(search);
    console.log(queryParams);
    // fetchDataSource();
  }, [search])

  return (
    <Main location={location}>
      <div className={styles.outerContainer}>
        <FilterWrapper>
          <CategoryItem/>
          <DateRangeItem/>
          <PriceItem/>
        </FilterWrapper>
        <Table
          style={{ width: '100%' }}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    </Main>
  );
}

export default connect(({ check }) => ({
  dataSource: check.list
}), dispatch => ({
  fetchDataSource: payload => {
    dispatch({type: 'check/fetch', payload})
  }
}))(Index);
