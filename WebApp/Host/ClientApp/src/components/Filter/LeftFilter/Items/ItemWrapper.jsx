import React  from 'react'
import { Tooltip } from 'antd';

import styles from './ItemWrapper.less'

const ItemWrapper = ({ isCollapsed, renderItemContent, renderMinimalItemContent }) => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        {isCollapsed
          ? <Tooltip placement='rightBottom' title={renderItemContent}>{renderMinimalItemContent()}</Tooltip>
          : renderItemContent()}
      </div>
    </div>
  );
};

export default ItemWrapper;
