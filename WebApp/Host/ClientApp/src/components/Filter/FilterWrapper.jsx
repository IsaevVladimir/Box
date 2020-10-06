import React from 'react';

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
