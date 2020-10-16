import React from 'react';
import {connect} from 'dva';
import {Dropdown, Icon, Menu} from 'antd';

import styles from './EditableRow.less'

const EditableRow = ({title, row, addRow, removeRow}) => {
  const addHandler = (isBefore = true) => {
    if (isBefore) {
      addRow({ number: row.number - 1 })
    } else {
      addRow({ number: row.number + 1 })
    }
  }

  const removeHandler = () => removeRow(row.id);

  const menu = (
    <Menu>
      <Menu.Item onClick={addHandler}><Icon type='plus' />Добавить строку 'перед'</Menu.Item>
      <Menu.Item onClick={() => addHandler(false)}><Icon type='plus' />Добавить строку 'после'</Menu.Item>
      <Menu.Item onClick={removeHandler}><Icon type='delete' />Удалить строку</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <div className={styles.container}>
        {title}
      </div>
    </Dropdown>
  );
}

export default connect(null, dispatch => ({
  addRow: row => dispatch({type: 'row/addRow', payload: row}),
  removeRow: id => dispatch({type: 'row/removeRow', payload: id})
}))(EditableRow);
