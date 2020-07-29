import React from 'react';

import {
  Switch,
  Route,
} from 'react-router-dom';

import Main from './pages/Main';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </div>
  );
}
