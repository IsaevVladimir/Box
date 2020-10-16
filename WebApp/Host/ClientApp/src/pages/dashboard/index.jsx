import React from 'react';

import Main from '../../layouts/baseLayout';

import LinearChart from '../../components/Charts/Linear/index';

import mockData from './linearData';

function Index({location}) {

  return (
    <Main location={location}>
      <LinearChart dataSource={mockData} />
    </Main>
  );
}

export default Index;
