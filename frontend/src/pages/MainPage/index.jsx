import React from 'react';

import MainSidebar from '../../components/MainSidebar';
import MainContent from '../../components/MainContent';

import { MainWrapper } from './style';

export default function MainPage() {
  return (
    <MainWrapper>
      <MainSidebar />
      <MainContent />
    </MainWrapper>
  );
}
