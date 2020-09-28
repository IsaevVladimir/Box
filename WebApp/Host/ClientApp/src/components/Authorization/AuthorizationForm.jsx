import React, {useCallback, useState} from 'react';
import {Form, Row, Input, Button, Col} from 'antd'

import styles from './AuthorizationForm.less'

const {Item} = Form;

const AuthorizationForm = ({form}) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const {getFieldDecorator, getFieldsError} = form;

  const hasErrors = useCallback((fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]), []);

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }, [form]);

  return (
    <div className={styles.outerContainer}>
      <Form layout="vertical" onSubmit={handleSubmit} className={styles.form}>
        <Row>
          <Col span={isSignUp ? 12 : 24}>
            <Row type="flex" justify="space-between">
              <Item label='Login' colon={false}>
                {getFieldDecorator('login', {
                  rules: [
                    {
                      async validator(rule, value, callback) {
                        callback();
                      },
                    },
                  ],
                  initialValue: '',
                })(<Input placeholder=""/>)}
              </Item>
            </Row>
            <Row type="flex" align="top" justify="space-between">
              <Item label='Password' colon={false}>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      async validator(rule, value, callback) {
                        callback();
                      },
                    },
                  ],
                  initialValue: '',
                })(<Input type='password' placeholder=""/>)}
              </Item>
            </Row>
          </Col>
          {isSignUp && (
            <Col span={12} className={styles.signUpColumn} >
              <Row type="flex" justify="space-between">
                <Item label='Email' colon={false}>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        async validator(rule, value, callback) {
                          callback();
                        },
                      },
                    ],
                    initialValue: '',
                  })(<Input type='email' placeholder=""/>)}
                </Item>
              </Row>
              <Row type="flex" align="top" justify="space-between">
                <Item label='Password repeat' colon={false}>
                  {getFieldDecorator('passwordRepeat', {
                    rules: [
                      {
                        async validator(rule, value, callback) {
                          callback();
                        },
                      },
                    ],
                    initialValue: '',
                  })(<Input type='password' placeholder=""/>)}
                </Item>
              </Row>
            </Col>
          )}
        </Row>
        <Row type="flex" align="top" justify="space-between">
          <Item className={styles.submitButtonItem}>
            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
              Submit
            </Button>
          </Item>
          <Button className={styles.switcher} onClick={() => setIsSignUp(!isSignUp)} >
            {isSignUp ? 'SignIn' : 'SignUp'}
          </Button>
        </Row>
      </Form>
    </div>
  );
}

export default Form.create({name: 'login_form'})(AuthorizationForm);
