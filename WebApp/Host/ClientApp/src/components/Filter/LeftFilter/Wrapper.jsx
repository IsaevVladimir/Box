import React, { useState, cloneElement } from 'react';
import { Form } from 'antd';
import isArray from 'lodash/isArray';

import styles from './Wrapper.less'

const Wrapper = Form.create({
  name: 'formWrapper', // onValuesChange
})(({ children, form }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const normalizeChildren = () => {
    if (isArray(children))
      return children.map(x => cloneElement(x, { isCollapsed, form }))
    return cloneElement(children, { isCollapsed, form });
  }

  return (
    <div className={isCollapsed ? styles.collapsedContainer : styles.container}>
      {/* todo: ft collapsed filter
      /* <Switch onChange={() => setIsCollapsed(!isCollapsed)} /> */}
      <Form>
        {normalizeChildren()}
      </Form>
    </div>
  );
});

export default Wrapper;
