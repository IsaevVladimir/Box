import React from 'react'
import { withRouter } from 'react-router';
import {Form, Icon, Tooltip} from 'antd';

import { historyUpdate } from '../../../utils/router'
import styles from './ItemWrapper.less'

const ItemWrapper = ({ history, location, isCollapsed, iconType, label, children, form, initialValue, fieldName, valuePropName = 'value'}) => {

  const { getFieldDecorator } = form;

  const onChange = (e) => {
    historyUpdate(history, location.search, '/Check', fieldName, e);
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <Form.Item label={label}>
          {getFieldDecorator(fieldName, { valuePropName, initialValue, onChange })
          (isCollapsed
            ? <Tooltip placement='rightBottom' title={children}><Icon type={iconType} /></Tooltip>
            : children
          )}
        </Form.Item>
      </div>
    </div>
  );
};

export default withRouter(ItemWrapper);
