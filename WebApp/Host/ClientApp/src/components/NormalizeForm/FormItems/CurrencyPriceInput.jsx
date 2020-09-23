import React from 'react';
import { connect } from 'dva';
import { InputNumber, Select } from 'antd';
import NormalizeFormItem from '../NormalizeFormItem';
import map from 'lodash/map';

const CurrencyPriceItem = ({ form, currency, initialPriceValue, initialCurrencyValue }) => {

  return (
    <div>
      <NormalizeFormItem form={form} label='Price' fieldName='price' initialValue={initialPriceValue}>
        <InputNumber/>
      </NormalizeFormItem>
      <NormalizeFormItem form={form} label='Currency' fieldName='currency' initialValue={initialCurrencyValue}>
        <Select>
          {map(currency, (value, index) => <Select.Option key={index.toString(36)} value={index}>{value}</Select.Option>)}
        </Select>
      </NormalizeFormItem>
    </div>
  );
};

export default connect(({ check }) => ({
  currency: check.currency,
}))(CurrencyPriceItem);
