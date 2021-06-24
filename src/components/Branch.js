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
  console.log('branch', branch);
  const x = useParams();
  console.log('x', x);
  // const [repos, setRepos] = useState(null)
  const getBranch = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', localStorage.getItem('AccessToken'));
    fetch(`http://localhost:3001/api/v1/users/branches?full_name=${x.userName}/${x.repoName}`,
      {
        method: 'GET',
        headers: myHeaders,
      }).then((resp) => {
      resp.json();
      // console.log('branch', resp);
    }).then((resp) => {
      // console.log('respbranch', resp);
      setBranch(resp);
      console.log('nehajj', resp);
      // console.log()
    }).catch((err) => (err));
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
                {arr.map((item) => (
                  <tr>
                    <th>{item}</th>
                  </tr>
                ))}
                <tr>
                  <th>Branch</th>
                </tr>
                {branch === undefined ? <tr>NO branch Present </tr> : branch.map((item) => (
                  <tr>
                    <th>{item}</th>
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
