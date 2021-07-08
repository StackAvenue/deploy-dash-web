import { React, useEffect, useState } from 'react';
import '../../assets/scss/branchesPage.scss';
import Spinner from 'react-bootstrap/Spinner';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import API from '../../services/API';

export default function Repositories() {
  const [repos, setRepos] = useState([]);
  const [userName, setUserName] = useState('Loading');
  const [userData, setUserData] = useState(null);
  const [showAllRepos, setShowAllRepos] = useState(true);
  const [searchedRepos, setSearchedRepos] = useState(null);
  const history = useHistory();
  const navigateTo = () => history.push('/');

  const getRepos = () => {
    API.getRepos().then((res) => {
      setRepos(res.repositories);
    });
  };

  const getUserDetails = () => {
    API.getUserDetails().then((res) => {
      setUserName(res.user.login);
      setUserData(res.user);
    });
  };

  useEffect(() => {
    getRepos();
    getUserDetails();
  }, []);

  const signOut = () => {
    window.localStorage.removeItem('AccessToken');
    navigateTo();
  };

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

  const resyncPage = () => {
    // eslint-disable-next-line no-restricted-globals
    window.location.reload();
  };

  return (
    <div className="homepage">
      <div className="parent-div">
        <div className="branch-div">
          <h2>DeployDash</h2>
          <div className="user">
            <h5 className="user-name">{userName}</h5>
            <div className="avatar">
              <img src={userData != null ? userData.avatar_url : ''} alt="" />
            </div>
            <DropdownButton
              menuAlign="right"
              title=""
              id="dropdown-menu-align-right"
            >
              <Dropdown.Item eventKey="1" onClick={(e) => resyncPage(e)}>Re-sync</Dropdown.Item>
              <Dropdown.Item eventKey="4" onClick={(e) => signOut(e)}>Sign out</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
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
          </div>
        ) : <Spinner animation="border" variant="secondary" />}
      </div>
    </div>
  );
}
