/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
import { React, useEffect, useState } from 'react';
import '../assets/scss/branchesPage.scss';
import Spinner from 'react-bootstrap/Spinner';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Branch from './Branch';

export default function Repositories() {
  const [repos, setRepos] = useState([]);
  // eslint-disable-next-line no-console
  console.log('repo', repos);
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

  const getRepos = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', localStorage.getItem('AccessToken'));
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/users/repositories`,
      {
        method: 'GET',
        headers: myHeaders,
      },
    ).then((response) => response.json())
      .then((jsondata) => {
        setRepos(jsondata.repositories);
      });
  };

  const getUserDetails = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', localStorage.getItem('AccessToken'));
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/users`,
      {
        method: 'GET',
        headers: myHeaders,
      },
    ).then((response) => response.json())
      .then((jsondata) => {
        setUserName(jsondata.user.login);
        setUserData(jsondata.user);
      });
  };

  useEffect(() => {
    getRepos();
    getUserDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = () => {
    window.localStorage.removeItem('AccessToken');
    localStorage.removeItem('UserAssets');
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
