import React from 'react';
import { connect } from 'dva';
import { DatePicker } from 'antd';

import ItemWrapper from '../ItemWrapper';
import styles from '../ItemWrapper.less';

const { RangePicker } = DatePicker;

const DateRangeItem = ({ value, maxValue, minValue, isCollapsed, form }) => {

  return (
    <ItemWrapper
      isCollapsed={isCollapsed}
      form={form}
      iconType='bars'
      fieldName='dateRange'
      initialValue={value}
      valuePropName='value'
      label='Date range:'
    >
      <RangePicker
        className={styles.dateRangePicker}
        disabledDate={momentDate => !(momentDate > maxValue || momentDate < minValue)}
      />
    </ItemWrapper>
  );
}

export default connect(({ setting }) => ({
  maxValue: setting.dateRange.max,
  minValue: setting.dateRange.min
}))(DateRangeItem);
