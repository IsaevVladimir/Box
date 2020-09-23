import React, {useState, useEffect, useMemo} from 'react';
import {connect} from 'dva';
import isNil from 'lodash/isNil';
import get from 'lodash/get';
import eq from 'lodash/eq';
import map from 'lodash/map';
import find from 'lodash/find';
import moment from 'moment';
import { Modal, Input, InputNumber, DatePicker, Select, Row, Col } from 'antd';

import NormalizeForm from '../../../components/NormalizeForm/NormalizeForm';
import NormalizeFormItem from '../../../components/NormalizeForm/NormalizeFormItem';
import LocationSelect from '../../../components/NormalizeForm/FormItems/LocationSelect';
import CurrencyPriceInput from '../../../components/NormalizeForm/FormItems/CurrencyPriceInput';

const EditModal = ({ form, check, checks, currency, categories, closeModal }) => {

  const normalizeCheck = useMemo(() => {
    if (isNil(check)) return null;
    if (eq(get(check, 'id'), null)) return check;
    return find(checks, x => eq(get(x, 'id'), get(check, 'id')));
  }, [check, checks]);
  const visibleModal = useMemo(() => !isNil(normalizeCheck), [normalizeCheck]);
  const [coords, setCoords] = useState(get(normalizeCheck, 'coordinates'));
  useEffect(() => setCoords(get(normalizeCheck, 'coordinates')), [normalizeCheck]);

  const onSubmit = async () => {
    /* await form.validateFieldsAndScroll(async (errors, partialCheck) => {
      if (!isNil(errors) && !isEmpty(errors)) return;
      partialCheck.coordinates = coords;
      editCheck(assign(normalizeCheck, partialCheck)).then(() => closeModal()).catch(() => closeModal());
    }); */
  }

  return (
    <Modal visible={visibleModal} onOk={onSubmit} onCancel={closeModal} width='50%'>
      <NormalizeForm>
        <Row>
          <Col span={12}>
            <NormalizeFormItem form={form} label='Name' fieldName='name' initialValue={get(normalizeCheck, 'name')}>
              <Input/>
            </NormalizeFormItem>
          </Col>
          <Col span={12}>
            <NormalizeFormItem form={form} label='Category' fieldName='categoryId' initialValue={get(normalizeCheck, 'categoryId')}>
              <Select>
                {map(categories, x => <Select.Option key={x.id.toString(36)} value={x.id}>{x.name}</Select.Option>)}
              </Select>
            </NormalizeFormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <LocationSelect form={form} initialValue={get(normalizeCheck, 'coordinates')} coords={coords} setValue={setCoords} />
          </Col>
          <Col span={12}>
            <CurrencyPriceInput form={form} initialPriceValue={get(normalizeCheck, 'price')} initialCurrencyValue={get(normalizeCheck, 'currency')} />
            <NormalizeFormItem form={form} label='PayDt' fieldName='payDt' initialValue={moment(get(normalizeCheck, 'payDt'))}>
              <DatePicker/>
            </NormalizeFormItem>
          </Col>
          <Row>
            <NormalizeFormItem form={form} label='Description' fieldName='description' initialValue={moment(get(normalizeCheck, 'payDt'))}>
              <Input.TextArea rows={4}/>
            </NormalizeFormItem>
          </Row>
        </Row>

      </NormalizeForm>
    </Modal>
  );
};

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
