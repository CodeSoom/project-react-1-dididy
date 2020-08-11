import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import MainSidebar from '../../components/MainSidebar';
import MainContent from '../../components/MainContent';

import { MainWrapper } from './style';

export default function MainPage() {
  const [tunnel, setTunnel] = useState(null);

  const history = useHistory();

  return (
    <MainWrapper>
      <MainSidebar tunnel={tunnel} setTunnel={setTunnel} history={history} />
      <MainContent tunnel={tunnel} setTunnel={setTunnel} />
    </MainWrapper>
  );
}
