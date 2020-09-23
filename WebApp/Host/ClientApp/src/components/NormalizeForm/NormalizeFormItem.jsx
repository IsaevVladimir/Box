import React, { useContext } from 'react';
import { Form } from 'antd'

import FormContext from './FormContext';

export default ({ children, label, fieldName, initialValue, rules = [] }) => {
  const form = useContext(FormContext);
  const { getFieldDecorator } = form;

  return (
    <Form.Item label={label}>
      {getFieldDecorator(fieldName, { initialValue , rules })(children)}
    </Form.Item>
  );
}
