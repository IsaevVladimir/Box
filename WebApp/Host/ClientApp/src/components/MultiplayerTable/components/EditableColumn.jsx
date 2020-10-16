import React from 'react';
import {Icon, Menu, Dropdown} from 'antd';

import styles from './EditableColumn.less'

export default ({ title, column }) => {

  // todo: хранение колонок в БД
  const addHandler = (isBefore = true) => {

  }

  const editHandler = () => {

  }

  const removeHandler = () => {

  }

  const menu = (
    <Menu >
      <Menu.Item onClick={addHandler}><Icon type='plus' />Добавить колонку 'перед'</Menu.Item>
      <Menu.Item onClick={() => addHandler(false)}><Icon type='plus' />Добавить колонку 'после'</Menu.Item>
      <Menu.Item onClick={editHandler}><Icon type='edit' />Изменить колонку</Menu.Item>
      <Menu.Item onClick={removeHandler}><Icon type='delete' />Удалить колонку</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <div className={styles.container}>
        {title}
      </div>
    </Dropdown>
  );
};
