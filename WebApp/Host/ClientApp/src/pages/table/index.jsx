import React from 'react';

import Main from '../../layouts/baseLayout';
import MultiplayerTable from '../../components/MultiplayerTable';

function Index({ location }) {
  return (
    <Main location={location}>
      <MultiplayerTable />
    </Main>
  );
}

export default Index;
