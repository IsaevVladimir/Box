import React, {useState, useEffect, useRef} from 'react';
import {Input} from 'antd';
import get from 'lodash/get';
import eq from 'lodash/eq';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import NormalizeForm from '../../NormalizeForm/NormalizeForm';
import NormalizeFormItem from '../../NormalizeForm/NormalizeFormItem';

import { normalizeDataIndex } from '../utils';

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
      const normalizedDataIndex = normalizeDataIndex(dataIndex);
      const sourceCell = record[normalizedDataIndex];
      if (!eq(sourceCell.value, value)) {
        sourceCell.value = value;
        handleSave(sourceCell);
      }

      toggleEdit();
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  const cellValue = get(record, dataIndex);
  if (editable) {
    childNode = editing ? (
      <NormalizeForm>
        <NormalizeFormItem fieldName={dataIndex} initialValue={cellValue}>
          <Input style={{ width: '50px' }} className={styles.cellInput} ref={inputRef} onPressEnter={save} onBlur={save}/>
        </NormalizeFormItem>
      </NormalizeForm>
    ) : (
      <div className={styles.editableCellValueWrap} onClick={toggleEdit}>
        {isNil(cellValue) || isEmpty(cellValue) ? <div>&nbsp;</div> : cellValue}
      </div>
    );
  }

  return <td {...restProps} style={{ padding: 0 }}>{childNode}</td>;
};
