import { React, useEffect, useState } from "react";
import "../assets/css/branchesPage.css";
import Spinner from 'react-bootstrap/Spinner'

export default function Repositories() {
  const [repos, setRepos] = useState(null)
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false)
  const [userName, setUserName] = useState('default')
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("AccessToken") === null) {
      let check = getParameterByName('code', window.location.href)
      getInfo(check)
    }
  }, []);

  const getInfo = (code) => {
    fetch(
      `http://localhost:3001/api/v1/github_oauth/authorise_user?code=${code}`,
      {
        method: "GET"
      }
    ).then(response => response.json())
    .then(jsondata => {
      setUserData(jsondata.user)
      setUserName(jsondata.user.login)
      fetchRepos(jsondata.user.url)
      localStorage.setItem("AccessToken", jsondata.user.access_token);
    })
  };

  const fetchRepos = (url) => {
    fetch(
      `${url}/repos`,
      {
        method: "GET",
      }
    ).then(response => response.json())
    .then(jsondata => {
      setRepos(jsondata)
    })
  }

  const getParameterByName = (name, url) => {
    console.log(url)
    if (!url) {
    url = "http://localhost:3000/login/oauth/authorize?code=22420353c9c197911558";
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
   }

  const onDropdownClick = (e) => {
    setShowLogoutDropdown(!showLogoutDropdown)
  }

  const signOut = () => {
    window.localStorage.removeItem("AccessToken")
    window.close()
  }

  return (
    <div className="homepage">
      <div className="parent-div">
        <div className="branch-div">
          <h2>DeployDash</h2>
          <div className="user">
            <h5 className="user-name">{userName}</h5>
            <div className="avatar">
              <img src={userData !=null ? userData.avatar_url : ''} alt="alternatetext" />
            </div>
            <div className="dropdown-arrow"><i className="fa fa-caret-down" onClick={(e) => onDropdownClick(e)} aria-hidden="true"></i></div>
          </div>
        </div>
        {showLogoutDropdown ? <div className="logout-dropdown">
          <div>Re-sync</div>
          <div onClick={(e) => signOut(e)}>Sign out</div>
        </div> : null}
        {repos !== null ? <div className="repo-div">
          <div className="search-bar">
            <input placeholder="Enter repository name"></input>
          </div>
          <div className="branch">
            <table>
              <thead>
                <tr>
                  <th>Repositories</th>
                </tr>
              </thead>
              <tbody>
                {repos && repos.map(repo => {
                  return (
                    <tr>
                      <td>{repo.name}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>: <Spinner animation="border" />}
      </div>
    </div>
  );
}
