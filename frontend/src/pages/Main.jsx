import React from 'react';

import MainSidebar from '../components/MainSidebar';
import MainContent from '../components/MainContent';

import { MainWrapper } from './Main.style';

export default function Main() {
  return (
    <MainWrapper>
      <MainSidebar />
      <MainContent />
    </MainWrapper>
  );
}
