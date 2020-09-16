import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment'

import ItemWrapper from './ItemWrapper';
import styles from './ItemWrapper.less';

const { RangePicker } = DatePicker;

const DateRangeItem = ({ isCollapsed, form }) => {

  return (
    <ItemWrapper
      isCollapsed={isCollapsed}
      form={form}
      iconType='bars'
      initialValue={[moment(), moment()]}
      fieldName='dateRange'
      valuePropName='value'
      label='Date range:'
    >
      <RangePicker className={styles.dateRangePicker} />
    </ItemWrapper>
  );
}

export default DateRangeItem;
