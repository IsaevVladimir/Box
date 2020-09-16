import React from 'react';
import PropTypes from 'prop-types';
import {
  Router, Switch, Route, Redirect
} from 'dva/router';
import Dynamic from 'dva/dynamic';

function RouterConfig({
  history, app
}) {
  const Index = Dynamic({
    app,
    // models: () => [
    //   import('./models/index')
    // ],
    component: () => import('./routes/index')
  });
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/Check" />
        <Route exact path="/Check" component={Index} />
      </Switch>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired
};

export default RouterConfig;
