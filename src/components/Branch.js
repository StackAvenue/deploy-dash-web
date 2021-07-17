import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Branch() {
  const [branch, setBranch] = useState([]);
  const RepoName = useParams();
  const [showAllBranches, setShowAllBranches] = useState(true);
  const [searchedBranches, setSearchedBranches] = useState(null);
  const getBranch = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', localStorage.getItem('AccessToken'));
    fetch(
      `http://localhost:3001/api/v1/users/branches?full_name=${RepoName.userName}/${RepoName.repoName}`,
      {
        method: 'GET',
        headers: myHeaders,
      },
    )
      .then((response) => response.json())
      .then((jsondata) => {
        setBranch(jsondata.branches);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    if (value) {
      const searchedRepositories = branch.filter((repo) => {
        const repoName = repo.name.toLowerCase();
        return repoName.includes(value);
      });
      setShowAllBranches(false);
      setSearchedBranches(searchedRepositories);
    } else {
      setShowAllBranches(true);
    }
  };

  useEffect(() => {
    getBranch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="repo-div">
      <div className="search-bar">
        <input placeholder="Enter branch name" onChange={(e) => handleChange(e)} />
        <button type="submit">Deploy</button>
      </div>
      <div className="branch">
        <table>
          <thead>
            <tr>
              <th>Branch</th>
            </tr>
            { branch && showAllBranches && branch.map((items) => (
              <tr key={items.name}>
                <th>{items.name}</th>
              </tr>
            ))}
            {searchedBranches && !showAllBranches && searchedBranches.map((branchItem) => (
              <tr key={branchItem.name}>
                <td>{branchItem.name}</td>
              </tr>
            ))}
          </thead>
          <tbody />
        </table>
      </div>
    </div>
  );
}

export default Branch;
