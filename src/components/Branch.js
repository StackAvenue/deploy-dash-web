/* eslint-disable no-lone-blocks */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Branch() {
  const [branch, setBranch] = useState([]);
  const RepoName = useParams();
  const getBranch = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', localStorage.getItem('AccessToken'));
    fetch(`http://localhost:3001/api/v1/users/branches?full_name=${RepoName.userName}/${RepoName.repoName}`,
      {
        method: 'GET',
        headers: myHeaders,
      }).then((response) => response.json())
      .then((jsondata) => {
        console.log(jsondata);
        setBranch(jsondata.branches);
      });
  };
  useEffect(() => {
    getBranch();
  });

  const arr = ['branch 1', 'branch 2', 'branch 3', 'branch 4'];

  return (
    <div className="homepage">
      <div className="parent-div">
        <div className="branch-div">
          <h2>DeployDash</h2>
          <div className="user">
            <h5 className="user-name">user_name</h5>
            <div className="avatar" />
          </div>
        </div>
        <div className="repo-div">
          <div className="search-bar">
            <input placeholder="Enter branch name" />
            <button type='submit'>Deploy</button>
          </div>
          <div className="branch">
            <table>
              <thead>
                <tr>
                  <th>Branch</th>
                </tr>
                {branch.map((items) => (
                  <tr>
                    <th>{items.name}</th>
                  </tr>
                ))}
              </thead>
              <tbody />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Branch;
