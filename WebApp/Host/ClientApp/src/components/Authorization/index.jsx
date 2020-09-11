import React from 'react';
import { connect } from 'dva';
import hasIn from "lodash/hasIn";

import AuthorizationForm from './AuthorizationForm';

function Authorization({ currentUser, children }) {
  const isAuthorized = !hasIn(currentUser, 'Id');

  return isAuthorized ? children : <AuthorizationForm />;
}

export default connect(({ user }) => ({ currentUser: user.current }))(Authorization);
