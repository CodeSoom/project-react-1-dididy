import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Reset from './Reset.style';
import { StyleWrapper } from './App.style';
import Header from './components/Header';
import MainPage from './pages/MainPage';

export default function App() {
  return (
    <div>
      <Reset />
      <Switch>
        <StyleWrapper>
          <Header />
          <Route path="/" component={MainPage} />
          <Route path="/:id" component={MainPage} />
        </StyleWrapper>
      </Switch>
    </div>
  );
}
