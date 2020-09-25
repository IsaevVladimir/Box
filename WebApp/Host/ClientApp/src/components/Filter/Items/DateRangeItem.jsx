import React from 'react';
import { connect } from 'dva';
import { DatePicker } from 'antd';

import ItemWrapper from '../ItemWrapper';

const { RangePicker } = DatePicker;

const DateRangeItem = ({ value, maxValue, minValue, form }) => {

  return (
    <ItemWrapper
      form={form}
      fieldName='dateRange'
      initialValue={value}
      label='Date range:'
    >
      <RangePicker disabledDate={momentDate => !(momentDate > maxValue || momentDate < minValue)} />
    </ItemWrapper>
  );
}

export default connect(({ setting }) => ({
  maxValue: setting.dateRange.max,
  minValue: setting.dateRange.min
}))(DateRangeItem);
