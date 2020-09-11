import React from 'react';

import CheckTable from './components/checkTable';
import CheckFilter from './components/checkFilter';

import styles from './index.less'

const Check = () => {

  return (
    <div className={styles.outerContainer}>
      <CheckFilter />
      <CheckTable />
    </div>
  );
}

export default Check;
