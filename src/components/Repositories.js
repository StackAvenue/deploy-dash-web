/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
import { React, useEffect, useState } from 'react';
import '../assets/scss/branchesPage.scss';
import Spinner from 'react-bootstrap/Spinner';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Repositories() {
  const [repos, setRepos] = useState(null);
  const [userName, setUserName] = useState('Loading');
  const [userData, setUserData] = useState(null);
  const [showAllRepos, setShowAllRepos] = useState(true);
  const [searchedRepos, setSearchedRepos] = useState(null);

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
      }).catch((err) => {
        if (err) {
          toast.error('Something went wrong!!', {
            className: 'error-toast',
            position: toast.POSITION.TOP_CENTER,
          });
        }
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
        toast.success('Successfully Logged In', {
          className: 'error-toast',
          position: toast.POSITION.TOP_RIGHT,
        });
      }).catch((err) => {
        if (err) {
          toast.error('Something went wrong', {
            className: 'error-toast',
            position: toast.POSITION.TOP_RIGHT,
          });
        }
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
                      <td>{repo.name}</td>
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
