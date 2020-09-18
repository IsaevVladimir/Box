import React from 'react'
import { connect } from 'dva';
import { Slider } from 'antd';

import ItemWrapper from '../ItemWrapper';
import styles from '../ItemWrapper.less'

const PriceItem = ({ value, maxValue, minValue, isCollapsed, form }) => {
  return (
    <ItemWrapper
      isCollapsed={isCollapsed}
      form={form}
      iconType='pay-circle'
      initialValue={[0, 300]}
      fieldName='priceRange'
      valuePropName='value'
      label='Price range:'
    >
      <Slider value={value} range max={maxValue} min={minValue} className={styles.rangePicker} />
    </ItemWrapper>
  );
};

export default connect(({ setting }) => ({
  maxValue: setting.priceRange.max,
  minValue: setting.priceRange.min
}))(PriceItem);
