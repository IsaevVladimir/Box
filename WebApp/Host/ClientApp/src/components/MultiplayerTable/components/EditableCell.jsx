import React, {useState, useEffect, useRef} from 'react';
import {Input} from 'antd';
import get from 'lodash/get';

import NormalizeForm from '../../NormalizeForm/NormalizeForm';
import NormalizeFormItem from '../../NormalizeForm/NormalizeFormItem';

import styles from './EditableCell.less';

export default ({title, editable, children, dataIndex, record, handleSave, ...restProps}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => setEditing(!editing);

  const save = () => {
    try {
      const value = get(inputRef, 'current.props.value', '');

      toggleEdit();
      handleSave({  });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <NormalizeForm>
        <NormalizeFormItem fieldName={dataIndex} initialValue={record[dataIndex]}>
          <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
        </NormalizeFormItem>
      </NormalizeForm>
    ) : (
      <div className={styles.editableCellValueWrap} style={{paddingRight: 24}} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
