import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import Repositories from './Repositories';
import Branch from './Branch';

export default function AppContainer() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/repositories">
            <Repositories />
          </Route>
          <Route path="/repositories/:reponame/branch">
            <Branch />
          </Route>
          <Route exact path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
