import React, {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import {connect} from 'dva';
import isNil from 'lodash/isNil';
import get from 'lodash/get';
import eq from 'lodash/eq';
import find from 'lodash/find';
import assign from 'lodash/assign';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { Modal, Input, TreeSelect, DatePicker, Row, Col } from 'antd';

import NormalizeForm from '../../../components/NormalizeForm/NormalizeForm';
import NormalizeFormItem from '../../../components/NormalizeForm/NormalizeFormItem';
import LocationFormItem from '../../../components/NormalizeForm/FormItems/LocationFormItem';
import PriceFormItem from '../../../components/NormalizeForm/FormItems/PriceFormItem';

import { listToTree, normalizeListToTreeSelect} from '../../../utils/tree';

import styles from './EditModal.less'

const EditModal = ({ check, checks, categories, closeModal, editCheck }) => {

  const formRef = useRef(null);

  const onCancel = useCallback(() => {
    formRef.current.resetFields()
    closeModal();
  }, []);

  const normalizeCheck = useMemo(() => {
    if (isNil(check)) return null;
    if (eq(get(check, 'id'), null)) return { coordinates: get(check, 'coordinates') };
    return find(checks, x => eq(get(x, 'id'), get(check, 'id')));
  }, [check, checks]);
  const visibleModal = useMemo(() => !isNil(normalizeCheck), [normalizeCheck]);

  const onSubmit = useCallback(async () => {
    await formRef.current.validateFieldsAndScroll(async (errors, partialCheck) => {
      if (!isNil(errors) && !isEmpty(errors)) return;
      editCheck(assign(normalizeCheck, partialCheck)).then(() => onCancel()).catch(() => onCancel());
    });
  }, []);

  const categoriesTree = useMemo(() => {
    return listToTree(normalizeListToTreeSelect(categories));
  }, [categories]);

  return (
    <Modal visible={visibleModal} onOk={onSubmit} onCancel={onCancel} width='50%'>
      <NormalizeForm ref={formRef}>
        <Row key='topRow'>
          <Col span={12} className={styles.paddingCol}>
            <NormalizeFormItem
              label='Name'
              fieldName='name'
              initialValue={get(normalizeCheck, 'name')}
              rules={[{ required: true }]}
            >
              <Input/>
            </NormalizeFormItem>
            <NormalizeFormItem
              label='Category'
              fieldName='categoryId'
              initialValue={get(normalizeCheck, 'categoryId')}
            >
              <TreeSelect treeData={categoriesTree} />
            </NormalizeFormItem>
            <Col span={12}>
              <PriceFormItem initialPriceValue={get(normalizeCheck, 'price')} initialCurrencyValue={get(normalizeCheck, 'currency')} />
            </Col>
            <Col span={12}>
              <NormalizeFormItem
                label='PayDt'
                fieldName='payDt'
                initialValue={moment(get(normalizeCheck, 'payDt'))}
                rules={[{ required: true }]}
              >
                <DatePicker/>
              </NormalizeFormItem>
            </Col>
          </Col>
          <Col span={12} className={styles.paddingCol}>
            <LocationFormItem initialValue={get(normalizeCheck, 'coordinates')} />
          </Col>
        </Row>
        <Row key='bottomRow'>
          <NormalizeFormItem
            label='Description'
            fieldName='description'
            initialValue={get(normalizeCheck, 'description')} >
            <Input.TextArea rows={4}/>
          </NormalizeFormItem>
        </Row>
      </NormalizeForm>
    </Modal>
  );
};

export default connect(({check, checkCategory}) => ({
  checks: check.list,
  categories: checkCategory.list
}), dispatch => ({
  editCheck: check => {
    if (eq(get(check, 'id', null), null)) {
      return dispatch({type: 'check/add', payload: check})
    }
    return dispatch({type: 'check/update', payload: check})
  }
}))(EditModal);
