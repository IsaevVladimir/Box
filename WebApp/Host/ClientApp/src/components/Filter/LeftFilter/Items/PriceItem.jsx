import React from 'react'
import { Slider } from 'antd';

import ItemWrapper from './ItemWrapper';
import styles from './ItemWrapper.less'

const PriceItem = ({ value, isCollapsed, form }) => {
  return (
    <ItemWrapper
      isCollapsed={isCollapsed}
      form={form}
      iconType='pay-circle'
      initialValue={[0, 100]}
      fieldName='price'
      valuePropName='value'
      label='Price range:'
    >
      <Slider value={value} range className={styles.rangePicker} />
    </ItemWrapper>
  );
};

export default PriceItem;
