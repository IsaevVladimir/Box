import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

import styles from './header.less';

function Header({
  location
}) {
  return (
    <header className={styles.normal}>
      <div className={styles.logo}>
        <Link to="/">Demo</Link>
      </div>
      <Menu
        className={styles.menu}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/page01">
          <Link to="/page01"><Icon type="dashboard" />Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="/page02">
          <Link to="/page02"><Icon type="home" />Checks</Link>
        </Menu.Item>
        <Menu.Item key="/page03">
          <Link to="/page03"><Icon type="home" />Categories</Link>
        </Menu.Item>
      </Menu>
    </header>
  );
}

Header.propTypes = {
  location: PropTypes.object.isRequired
};

export default Header;
