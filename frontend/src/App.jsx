import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Reset from './Reset.style';
import { GlobalWrapper } from './App.style';
import Header from './components/Header';
import Main from './pages/MainPage';

export default function App() {
  return (
    <div>
      <Reset />
      <Switch>
        <GlobalWrapper>
          <Header />
          <Route path="/home" component={Main} />
        </Switch>
      </GlobalWrapper>
    </div>
  );
}
