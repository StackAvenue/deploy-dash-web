import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import Repositories from './Repositories';
import Authorize from './Authorize';
import Branch from './Branch';

export default function AppContainer() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/authorize">
            <Authorize />
          </Route>
          <Route path="/repositories" exact>
            <Repositories />
          </Route>
          <Route path="/repositories/:userName/:repoName/branch" exact>
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
