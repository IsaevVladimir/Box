import React, { useState } from 'react'
import { Slider, Icon } from 'antd';

import ItemWrapper from './ItemWrapper';
import styles from './ItemWrapper.less'

const PriceItem = ({ isCollapsed = false }) => {
  const [selectedPrice, setSelectedPrice] = useState([0, 100])

  const itemContent = () => {
    return (
      <div>
        <span>Price range: {selectedPrice.join(' - ')}</span>
        <Slider range value={selectedPrice} onChange={(v) => setSelectedPrice(v)} className={styles.rangePicker} />
      </div>
    );
  }

  const minimalItemContent = () => {
    return <Icon type="pay-circle" />;
  }

  return <ItemWrapper isCollapsed={isCollapsed} renderItemContent={itemContent} renderMinimalItemContent={minimalItemContent} />
};

export default PriceItem;
