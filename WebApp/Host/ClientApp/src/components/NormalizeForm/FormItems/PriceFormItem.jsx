import React from 'react';
import { connect } from 'dva';
import { InputNumber, Select } from 'antd';
import NormalizeFormItem from '../NormalizeFormItem';
import map from 'lodash/map';

import styles from './PriceFormItem.less'

const PriceFormItem = ({ currency, initialPriceValue, initialCurrencyValue }) => {

  return (
    <div className={styles.container}>
      <NormalizeFormItem
        label='Price'
        fieldName='price'
        initialValue={initialPriceValue}
        rules={[{ required: true }]}
      >
        <InputNumber className={styles.priceInput} />
      </NormalizeFormItem>
      <NormalizeFormItem
        label='Currency'
        fieldName='currency'
        initialValue={initialCurrencyValue}
        rules={[{ required: true }]}
      >
        <Select className={styles.currencySelect} defaultActiveFirstOption>
          {map(currency, (value, index) => <Select.Option key={index.toString(36)} value={index}>{value}</Select.Option>)}
        </Select>
      </NormalizeFormItem>
    </div>
  );
};

export default connect(({ check }) => ({
  currency: check.currency,
}))(PriceFormItem);
