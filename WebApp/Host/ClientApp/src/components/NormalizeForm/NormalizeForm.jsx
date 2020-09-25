import React from 'react';
import { Form } from 'antd'

import FormContext from './FormContext';

export default Form.create()(({ form, children, className }) => {

  return (
    <FormContext.Provider value={form}>
      <Form className={className}>
        {children}
      </Form>
    </FormContext.Provider>
  );
});
