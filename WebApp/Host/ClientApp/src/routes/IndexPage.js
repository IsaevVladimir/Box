import React from 'react';
import { connect } from 'dva';
import hasIn from 'lodash/hasIn'
import get from 'lodash/get'

import SignInForm from '../components/SignIn/SignInForm';

function IndexPage({ currentUser }) {
  const isAuthorized = hasIn(currentUser, 'Id');

  const renderContent = () => {
    return ('');
  }

  return isAuthorized ? renderContent() : <SignInForm />;
}

// todo: dangerous connect
export default connect(({ user }) => ({ currentUser: get(user, 'current') }))(IndexPage);
