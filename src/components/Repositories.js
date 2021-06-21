import React, {useEffect, useState } from "react";
import "../assets/css/branchesPage.css";
import {Link} from 'react-router-dom';
import Branch from './Branch';

export default function Repositories() {
  const [repos, setRepos] = useState(null);
 
  

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
   
  },[]);


  const getInfo = (code) => {
    fetch(
      `http://3ed64a59313e.ngrok.io/api/v1/github_oauth/authorise_user?code=${code}`,
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
    url = "http://3ed64a59313e.ngrok.io/login/oauth/authorize?code=22420353c9c197911558/";
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
   }

 

   var arryval = [
     {name: 'Repo 1', id: "1",
      branch:["branch 1", "branch 2", "branch 3"]},
     {name: 'Repo 2', id: "2",
     branch:["branch 1", "branch 2", "branch 3", "branch 4"]},
     {name: 'Repo 3', id: "3",
     branch:["branch 1", "branch 2", "branch 3", "branch 4", "branch 5"]},
     {name: 'Repo 4', id: "4",
     branch:["branch 1", "branch 2"]}
    ];






   

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
                    {arryval.map(branchName => (
                    <tr>
                      <Link to={"/repositories/branch"}><td>{branchName.name}</td></Link> 
                    </tr>
                    ))}
                    
               
                   </tbody>
                
              
                
            </table>
          </div>
        </div>}
      </div>
    </div>
  );
}

