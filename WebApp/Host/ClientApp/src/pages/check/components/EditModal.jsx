import React, {useState, useEffect, useMemo} from 'react';
import {connect} from 'dva';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import assign from 'lodash/assign';
import get from 'lodash/get';
import eq from 'lodash/eq';
import map from 'lodash/map';
import find from 'lodash/find';
import moment from 'moment';
import {Modal, Form, Input, InputNumber, DatePicker, Col, Row, Select} from 'antd'
import LocationSelect from '../../../components/FormItems/LocationSelect'

const EditModal = Form.create()(({ closeModal, form, check, checks, editCheck, currency, categories }) => {
  const {getFieldDecorator} = form;

  const normalizeCheck = useMemo(() => {
    if (isNil(check)) return null;
    if (eq(get(check, 'id'), null)) return check;
    return find(checks, x => eq(get(x, 'id'), get(check, 'id')));
  }, [check, checks]);

  const visibleModal = useMemo(() => {
    return !isNil(normalizeCheck);
  }, [normalizeCheck]);

  const [coords, setCoords] = useState(get(normalizeCheck, 'coordinates'));

  useEffect(() => {
    setCoords(get(normalizeCheck, 'coordinates'));
  }, [normalizeCheck]);

  const onSubmit = async () => {
    await form.validateFieldsAndScroll(async (errors, partialCheck) => {
      if (!isNil(errors) && !isEmpty(errors)) return;
      partialCheck.coordinates = coords;
      editCheck(assign(normalizeCheck, partialCheck)).then(() => closeModal()).catch(() => closeModal());
    });
  }

  return (
    <Modal visible={visibleModal} onOk={onSubmit} onCancel={closeModal}>
      <Form>
        <Row>
          <Col span={12}>
            <Form.Item label='Name'>
              {getFieldDecorator('name', {initialValue: get(normalizeCheck, 'name'), rules: [{required: true}]})
              (<Input/>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Category'>
              {getFieldDecorator('categoryId', {initialValue: get(normalizeCheck, 'categoryId')})
              (<Select>
                {map(categories, x => {
                  return <Select.Option key={x.id.toString(36)} value={x.id}>{x.name}</Select.Option>
                })}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='Price'>
              {getFieldDecorator('price', {initialValue: get(normalizeCheck, 'price'), rules: [{required: true}]})
              (<InputNumber/>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Currency'>
              {getFieldDecorator('currency', {initialValue: get(normalizeCheck, 'currency'), rules: [{required: true}]})
              (<Select>
                {map(currency, (value, index) => {
                  return <Select.Option key={index.toString(36)} value={index}>{value}</Select.Option>
                })}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item label='Location'>
            {getFieldDecorator('coordinates')
            (<LocationSelect coords={coords} setValue={setCoords} />)}
          </Form.Item>
        </Row>
        <Form.Item label='Dt'>
          {getFieldDecorator('payDt', {initialValue: moment(get(normalizeCheck, 'payDt')), rules: [{required: true}]})
          (<DatePicker/>)}
        </Form.Item>
        <Form.Item label='Description'>
          {getFieldDecorator('description', {initialValue: get(normalizeCheck, 'description')})
          (<Input.TextArea rows={4}/>)}
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default connect(({check, checkCategory}) => ({
  currency: check.currency,
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
