import React from 'react';
import { connect } from 'dva';

import Main from '../layouts/baseLayout/main.jsx';
import Authorization from '../components/Authorization';

import Check from './check'

function Index({ location }) {
  return (
    <Authorization>
      <Main location={location}>
        <Check />
      </Main>
    </Authorization>
  );
}

export default connect()(Index);
