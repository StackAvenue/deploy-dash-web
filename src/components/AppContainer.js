import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './Auth/LoginPage';
import Repositories from './Home/Repositories';
import Authorize from './Auth/Authorize';
import Branch from './Branch';
import { ProtectedRoute } from '../utils/ProtectedRoute';
import Header from './Header';

export default function AppContainer() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/authorize">
            <Authorize />
          </Route>
          <Route path="/repositories/:userName/:repoName/branch" exact>
            <Branch />
          </Route>
          <ProtectedRoute path="/repositories" component={Repositories} />
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="*" component={() => '404 Not Found'} />
        </Switch>
      </div>
    </Router>
  );
}
