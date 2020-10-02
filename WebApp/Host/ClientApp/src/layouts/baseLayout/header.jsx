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
        <Menu.Item key="/Dashboard">
          <Link to="/Dashboard"><Icon type="line-chart" />Line chart (svg)</Link>
        </Menu.Item>
        <Menu.Item key="/Check">
          <Link to="/Check"><Icon type="environment" />Checks (YandexMap, Form)</Link>
        </Menu.Item>
        <Menu.Item key="/Table">
          <Link to="/Table"><Icon type="table" />Multiplayer Table (SignalR)</Link>
        </Menu.Item>
      </Menu>
    </header>
  );
}

Header.propTypes = {
  location: PropTypes.object.isRequired
};

export default Header;
