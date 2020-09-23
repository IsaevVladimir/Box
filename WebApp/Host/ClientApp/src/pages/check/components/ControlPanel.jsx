import React from 'react';
import { Button, Input } from 'antd';

import styles from './ControlPanel.less'

const ControlPanel = ({ openModal, setSearchValue }) => {

  const searchOnChange = (e) => {
    setSearchValue(e.target.value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        <Button onClick={() => openModal(null)} type='primary'>Add</Button>
      </div>
      <Input.Search className={styles.search} onChange={searchOnChange} />
    </div>
  );
}

export default ControlPanel;
