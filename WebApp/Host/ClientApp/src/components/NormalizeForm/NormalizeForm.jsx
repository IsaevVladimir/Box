import React from 'react';
import { Form } from 'antd'

import FormContext from './FormContext';

export default Form.create()(({ form, children, ...formProps }) => {

  return (
    <FormContext.Provider value={form}>
      <Form {...formProps} >
        {children}
      </Form>
    </FormContext.Provider>
  );
});
