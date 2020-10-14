import React, { useContext } from 'react';
import { Form } from 'antd'
import noop from 'lodash/noop'

import FormContext from './FormContext';

import styles from './NormalizeFormItem.less';

export default ({ children, label, fieldName, initialValue, rules = [], onChange = noop, ...otherFormItemProps }) => {
  const form = useContext(FormContext);
  const { getFieldDecorator } = form;

  return (
    <div className={styles.container}>
      <Form.Item label={label} {...otherFormItemProps} >
        {getFieldDecorator(fieldName, { initialValue , rules, onChange })(children)}
      </Form.Item>
    </div>
  );
}
