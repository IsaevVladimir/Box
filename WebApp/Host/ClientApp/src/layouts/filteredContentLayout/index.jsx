import React from 'react';
import styles from './index.less';
import FilterWrapper from '../../components/Filter/LeftFilter/Wrapper';

const FilteredContentLayout = ({ filterItems, children }) => {

  return (
    <div className={styles.outerContainer}>
      <FilterWrapper>
        {filterItems}
      </FilterWrapper>
      <div className={styles.contentContainer}>
        {children}
      </div>
    </div>
  );
}


export default FilteredContentLayout;
