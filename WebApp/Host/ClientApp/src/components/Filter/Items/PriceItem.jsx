import React from 'react'
import { connect } from 'dva';
import { Slider } from 'antd';

import ItemWrapper from '../ItemWrapper';

const PriceItem = ({ value, maxValue, minValue, form }) => {
  return (
    <ItemWrapper
      form={form}
      initialValue={[0, 300]}
      fieldName='priceRange'
      label='Price range:'
    >
      <Slider value={value} range max={maxValue} min={minValue} />
    </ItemWrapper>
  );
};

export default connect(({ setting }) => ({
  maxValue: setting.priceRange.max,
  minValue: setting.priceRange.min
}))(PriceItem);
