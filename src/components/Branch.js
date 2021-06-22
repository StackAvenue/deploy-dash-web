/* eslint-disable react/jsx-key */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

function Branch() {
  const [branches, setBranches] = useState([]);
  // const {id, branch} = useParams();

  // const [repos, setRepos] = useState(null)
  const getBranch = () => {
    fetch('http://localhost:3001/api/v1/users/branches?full_name=joshinehajoshi/Api-Integration-using-axios',
      {
        headers:
        { access_token: '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' },
      }).then((resp) => {
      resp.json();
      // console.log('branch', resp);
    }).then((resp) => {
      // console.log('respbranch', resp);
      setBranches(resp);
      // console.log("nehajj",resp.type)
      // console.log()
    }).catch((err) => (err));
  };
  useEffect(() => {
    getBranch();
  }, []);

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
