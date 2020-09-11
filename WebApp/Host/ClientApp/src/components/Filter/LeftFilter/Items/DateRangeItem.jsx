import React from 'react';
import {DatePicker, Icon} from 'antd';

import ItemWrapper from './ItemWrapper';
import styles from './ItemWrapper.less';

const {  RangePicker } = DatePicker;

const DateRangeItem = ({ isCollapsed = false }) => {

  const itemContent = () => {
    return (
      <div>
        <span>Date range:</span>
        <RangePicker className={styles.dateRangePicker} onChange={() => {}} />
      </div>
    );
  }

  const minimalItemContent = () => {
    return <Icon type="bars" />;
  }

  return <ItemWrapper isCollapsed={isCollapsed} renderItemContent={itemContent} renderMinimalItemContent={minimalItemContent} />
}

export default DateRangeItem;
