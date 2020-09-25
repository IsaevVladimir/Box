import React from 'react';

import NormalizeFormItem from '../NormalizeFormItem';
import LocationSelect from './LocationSelect';

export default ({ initialValue }) => {
  return (
    <NormalizeFormItem
      label='Coordinates'
      fieldName='coordinates'
      initialValue={initialValue}
      rules={[{ required: true }]}
    >
      <LocationSelect />
    </NormalizeFormItem>
  );
}
