﻿import React from 'react'
import { withRouter } from 'react-router';
import { historyUpdate } from '../../utils/router'

import NormalizeFormItem from '../NormalizeForm/NormalizeFormItem';
import styles from './ItemWrapper.less'

const ItemWrapper = ({ history, location, label, children, initialValue, fieldName}) => {

  const onChange = (e) => {
    historyUpdate(history, location.search, location.pathname, fieldName, e);
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <NormalizeFormItem label={label} fieldName={fieldName} initialValue={initialValue} onChange={onChange}>
          {children}
        </NormalizeFormItem>
      </div>
    </div>
  );
};

export default withRouter(ItemWrapper);
