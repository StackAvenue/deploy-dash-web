import { React } from 'react';
import '../../assets/scss/branchesPage.scss';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../../utils/ProtectedRoute';
import HeaderComp from '../HeaderComp';
import '../../assets/scss/repositoryPage.scss';
import RepoComp from './RepoComp';
import BranchComp from './BranchComp';

export default function Repositories() {
  return (
    <div className="repository-div">
      <HeaderComp />
      <Router>
        <div className="sub-container">
          <Switch>
            <ProtectedRoute path="/repositories/:userName/:repoName/branch" exact component={BranchComp} />
            <ProtectedRoute path="/repositories" component={RepoComp} />
            <Route path="*" component={() => '404 Not Found'} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
