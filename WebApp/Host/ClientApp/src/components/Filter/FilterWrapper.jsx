import React, { cloneElement } from 'react';
import { Form } from 'antd';
import isArray from 'lodash/isArray';

import NormalizeForm from '../NormalizeForm/NormalizeForm';
import styles from './FilterWrapper.less'

const FilterWrapper = ({ children }) => {

  return (
    <div className={styles.container}>
      <NormalizeForm className={styles.innerContainer}>
        {children}
      </NormalizeForm>
    </div>
  );
};

export default FilterWrapper;
