import { React, useEffect, useState } from "react";
import "../assets/css/branchesPage.css";

export default function Repositories() {
  const [repos, setRepos] = useState(null)

  useEffect(() => {
    // setTimeout(() => {
    //   console.log("hi")
    //   setRepos('Hi')
    // },10000)
    console.log("Window", window.location.href)
    setTimeout(() => {
    let check = getParameterByName('code', window.location.href)
    console.log("Checking", check)
    setRepos(check)
    getInfo(check)
    },5000)
  });

  const getInfo = (code) => {
    fetch(
      `http://localhost:3001/api/v1/github_oauth/authorise_user?code=${code}`,
      {
        method: "GET",
        // mode: 'no-cors'
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  return (
    <div className="homepage">
      <div className="parent-div">
        <div className="branch-div">
          <h2>DeployDash</h2>
          <div className="user">
            <h5 className="user-name">user_name</h5>
            <div className="avatar"></div>
          </div>
        </div>
        {repos != null && <div className="repo-div">
          <div className="search-bar">
            <input placeholder="Enter repository name"></input>
            <button>Deploy</button>
          </div>
          <div className="branch">
            <table>
              <thead>
                <tr>
                  <th>Repositories</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Repo 1</td>
                </tr>
                <tr>
                  <td>Repo 2</td>
                </tr>
                <tr>
                  <td>Repo 3</td>
                </tr>
                <tr>
                  <td>Repo 4</td>
                </tr>
                <tr>
                  <td>Repo 5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>}
      </div>
    </div>
  );
}
