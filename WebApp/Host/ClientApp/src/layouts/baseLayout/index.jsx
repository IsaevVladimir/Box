import React from 'react';
import PropTypes from 'prop-types';
import {
  Layout, BackTop
} from 'antd';

import Authorization from '../../components/Authorization';
import Header from './header.jsx';
import Footer from './footer.jsx';

import styles from './index.less';

function Main({children, location}) {
  return (
    <Authorization>
      <Layout className={styles.normal}>
        <Layout.Header className={styles.header}>
          <Header location={location}/>
        </Layout.Header>
        <Layout.Content className={styles.content}>
          <div className={styles.container}>
            {children}
          </div>
          <BackTop/>
        </Layout.Content>
        <Layout.Footer className={styles.footer}>
          <Footer/>
        </Layout.Footer>
      </Layout>
    </Authorization>
  );
}

Main.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
};

export default Main;
