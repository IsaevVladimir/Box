import React, { useMemo, useEffect } from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd'
import get from 'lodash/get'
import isNumber from 'lodash/isNumber'
import moment from 'moment';
import { parseQueryParams } from '../../utils/router'

import Main from '../../layouts/baseLayout';
import FilteredContentLayout from '../../layouts/filteredContentLayout';
import CategoryItem from '../../components/Filter/LeftFilter/Items/CategoryItem';
import DateRangeItem from '../../components/Filter/LeftFilter/Items/DateRangeItem';
import PriceItem from '../../components/Filter/LeftFilter/Items/PriceItem';

import styles from './index.less';

function Index({ location, dataSource, fetchDataSource }) {

  const [categories, fromDt, toDt, minPrice, maxPrice] = useMemo(() => {
    const filterValues = parseQueryParams(get(location, 'search', ''));

    let categories = get(filterValues, 'categories', [])
    categories = isNumber(categories) ? [ categories ] : categories;

    const dateRange = get(filterValues, 'dateRange', []);
    const fromDt = get(dateRange, '[0]', moment().add(-1, 'month'));
    const toDt = get(dateRange, '[1]', moment());

    const priceRange = get(filterValues, 'priceRange', []);
    const minPrice = get(priceRange, '[0]', 0);
    const maxPrice = get(priceRange, '[1]', 300);

    return [categories, fromDt, toDt, minPrice, maxPrice]
  }, [location.search])

  useEffect(() => {
    fetchDataSource({ categories, fromDt, toDt, minPrice, maxPrice });
  }, [categories, fromDt.format(), toDt.format(), minPrice, maxPrice])

  const filterItems = [
    <CategoryItem value={categories} />,
    <DateRangeItem value={[fromDt, toDt]} />,
    <PriceItem value={[minPrice, maxPrice]} />
  ];

  return (
    <Main location={location}>
      <FilteredContentLayout filterItems={filterItems} >
        Dashboard
      </FilteredContentLayout>
    </Main>
  );
}

export default connect(({ check }) => ({
  dataSource: check.list
}), dispatch => ({
  fetchDataSource: payload => dispatch({type: 'check/fetch', payload})
}))(Index);
