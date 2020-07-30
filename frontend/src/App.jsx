import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { Global, css } from '@emotion/core';

import Header from './components/Header';
import Main from './pages/Main';

import { GlobalWrapper } from './App.style';

export default function App() {
  return (
    <div>
      <Global
        styles={css`
          body {
            margin: 0;
          }
        `}
      />
      <Switch>
        <GlobalWrapper>
          <Header />
          <Route exact path="/" component={Main} />
        </GlobalWrapper>
      </Switch>
    </div>
  );
}
