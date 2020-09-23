import React from 'react';
import { Form } from 'antd'

import FormContext from './FormContext';

export default Form.create()(({ form, children }) => {

  return (
    <FormContext.Provider value={form}>
      <Form>
        {children}
      </Form>
    </FormContext.Provider>
  );
});
