import React, { useMemo, useEffect } from 'react';
import { connect } from 'dva';
import get from 'lodash/get'
import isNumber from 'lodash/isNumber'
import moment from 'moment';
import { parseQueryParams } from '../../utils/router'

import Main from '../../layouts/baseLayout';
import FilteredContentLayout from '../../layouts/filteredContentLayout';
import CategoryItem from '../../components/Filter/Items/CategoryItem';
import DateRangeItem from '../../components/Filter/Items/DateRangeItem';
import PriceItem from '../../components/Filter/Items/PriceItem';

import LinearChart from '../../components/Charts/Linear/index';

import styles from './index.less';

const linearData = [
  {
    id: 1,
    name: 'name 1',
    dt: moment().add(-10, 'h'),
    value: 10
  },
  {
    id: 2,
    name: 'name 2',
    dt: moment().add(-9, 'h'),
    value: 50
  },
  {
    id: 4,
    name: 'name 4',
    dt: moment().add(-8, 'h'),
    value: 90
  },
  {
    id: 5,
    name: 'name 5',
    dt: moment().add(-7, 'h'),
    value: 40
  },
  {
    id: 6,
    name: 'name 6',
    dt: moment().add(-6, 'h'),
    value: 20
  },
  {
    id: 6,
    name: 'name 6',
    dt: moment().add(-5, 'h'),
    value: 40
  },
  {
    id: 7,
    name: 'name 7',
    dt: moment().add(-4, 'h'),
    value: 10
  },
  {
    id: 8,
    name: 'name 8',
    dt: moment().add(-3, 'h'),
    value: 90
  },
  {
    id: 9,
    name: 'name 9',
    dt: moment().add(-2, 'h'),
    value: 50
  },
  {
    id: 10,
    name: 'name 10',
    dt: moment().add(-1, 'h'),
    value: 100
  },

];

function Index({ location, currency, dataSource, fetchDataSource }) {

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
        <LinearChart dataSource={linearData} />
      </FilteredContentLayout>
    </Main>
  );
}

export default connect(({ check }) => ({
  dataSource: check.list,
  currency: check.currency
}), dispatch => ({
  fetchDataSource: payload => dispatch({type: 'check/fetch', payload})
}))(Index);
