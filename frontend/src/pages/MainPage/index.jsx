import React, { useState } from 'react';

import MainSidebar from '../../components/MainSidebar';
import MainContent from '../../components/MainContent';

import { MainWrapper } from './style';

export default function MainPage() {
  const [tunnel, setTunnel] = useState();

  return (
    <MainWrapper>
      <MainSidebar tunnel={tunnel} setTunnel={setTunnel} />
      <MainContent tunnel={tunnel} setTunnel={setTunnel} />
    </MainWrapper>
  );
}
