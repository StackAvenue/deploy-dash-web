import { React, useEffect, useState } from 'react';
import '../../assets/scss/branchesPage.scss';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import HeaderComp from '../HeaderComp';
import '../../assets/scss/repositoryPage.scss';
import API from '../../services/API';

export default function Repositories() {
  const [repos, setRepos] = useState([]);
  const [showAllRepos, setShowAllRepos] = useState(true);
  const [searchedRepos, setSearchedRepos] = useState(null);

  const getRepos = () => {
    API.getRepos().then((res) => {
      setRepos(res.repositories);
    });
  };

  useEffect(() => {
    getRepos();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    if (value) {
      const searchedRepositories = repos.filter((repo) => {
        const repoName = repo.name.toLowerCase();
        return repoName.includes(value);
      });
      setShowAllRepos(false);
      setSearchedRepos(searchedRepositories);
    } else {
      setShowAllRepos(true);
    }
  };

  return (
    <div className="repository-div">
      <HeaderComp />
      <div>
        {repos !== null ? (
          <div className="repo-div">
            <div className="search-bar">
              <input placeholder="Enter repository name" onChange={(e) => handleChange(e)} />
            </div>
            <div className="branch">
              <table>
                <thead>
                  <tr>
                    <th>Repositories</th>
                  </tr>
                </thead>
                <tbody>
                  {repos && showAllRepos && repos.map((repo) => (
                    <tr key={repo.name}>
                      <Link to={`/repositories/${repo.full_name}/branch`}><td>{repo.name}</td></Link>
                    </tr>
                  ))}
                  {searchedRepos && !showAllRepos && searchedRepos.map((repo) => (
                    <tr key={repo.name}>
                      <td>{repo.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ToastContainer />
          </div>
        ) : <Spinner animation="border" variant="secondary" />}
      </div>
    </div>
  );
}
