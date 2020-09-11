import React, { useState, cloneElement } from 'react';
import { Switch } from 'antd';

import styles from './Wrapper.less'

const Wrapper = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const clonedChildren = children.map(x => cloneElement(x, { isCollapsed }))

  return (
    <div className={isCollapsed ? styles.collapsedContainer : styles.container}>
      <Switch onChange={() => setIsCollapsed(!isCollapsed)} />
      {clonedChildren}
    </div>
  );
}

export default Wrapper;
