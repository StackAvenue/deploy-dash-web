/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
import { React, useEffect, useState } from 'react';
import '../assets/scss/branchesPage.scss';
import Spinner from 'react-bootstrap/Spinner';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Repositories() {
  const [repos, setRepos] = useState([]);
  const [userName, setUserName] = useState('Loading');
  const [userData, setUserData] = useState(null);
  const [showAllRepos, setShowAllRepos] = useState(true);
  const [searchedRepos, setSearchedRepos] = useState(null);
  // const [newrepo, setNewRepo] = useState([]);

  // const getRepo = () => {
  //   fetch('http://localhost:3001/api/v1/users/repositories',
  //     {
  //       headers:
  //     { access_token: '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' },
  //     }).then((resp) => {
  //     resp.json();
  //     console.log('neha', resp);
  //   }).then((resp) => {
  //     setNewRepo(resp);
  //   }).catch((err) => (err));
  // };

  const getParameterByName = (name, url) => {
    if (!url) {
      url = 'http://localhost:3000/login/oauth/authorize?code=22420353c9c197911558';
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  const fetchRepos = (url) => {
    fetch(
      `${url}/repos`,
      {
        method: 'GET',
      },
    ).then((response) => response.json())
      .then((jsondata) => {
        setRepos(jsondata);
      });
  };

  const getInfo = (code) => {
    fetch(
      `http://localhost:3001/api/v1/github_oauth/authorise_user?code=${code}`,
      {
        method: 'GET',
      },
    ).then((response) => response.json())
      .then((jsondata) => {
        setUserData(jsondata.user);
        setUserName(jsondata.user.login);
        fetchRepos(jsondata.user.url);
        localStorage.setItem('AccessToken', jsondata.user.access_token);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('AccessToken') === null) {
      const check = getParameterByName('code', window.location.href);
      getInfo(check);
      // getRepo();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = () => {
    window.localStorage.removeItem('AccessToken');
    window.close();
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

  // const arryval = [
  //   {
  //     name: 'Repo 1',
  //     id: '1',
  //     branch: ['branch 1', 'branch 2', 'branch 3'],
  //   },
  //   {
  //     name: 'Repo 2',
  //     id: '2',
  //     branch: ['branch 1', 'branch 2', 'branch 3', 'branch 4'],
  //   },
  //   {
  //     name: 'Repo 3',
  //     id: '3',
  //     branch: ['branch 1', 'branch 2', 'branch 3', 'branch 4', 'branch 5'],
  //   },
  //   {
  //     name: 'Repo 4',
  //     id: '4',
  //     branch: ['branch 1', 'branch 2'],
  //   },
  // ];

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
              <Dropdown.Item eventKey="1">Re-sync</Dropdown.Item>
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
                      <Link to={`/repositories/${repo.name}/branch`}><td>{repo.name}</td></Link>
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
