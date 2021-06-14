import React from "react";
import LoginPage from "./LoginPage";
import Repositories from "./Repositories";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function AppContainer() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/repositories">
            <Repositories />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
