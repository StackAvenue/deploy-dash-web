import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import HeaderComp from './HeaderComp';
import '../assets/scss/branchesPage.scss';
import 'react-toastify/dist/ReactToastify.css';
import API from '../services/API';

function Branch() {
  const [branch, setBranch] = useState([]);
  const RepoName = useParams();
  const [showAllBranches, setShowAllBranches] = useState(true);
  const [searchedBranches, setSearchedBranches] = useState(null);

  const getBranch = () => {
    API.getBranch(RepoName)
      .then((jsondata) => {
        setBranch(jsondata.branches);
      })
      .catch(() => {
        toast.error('Something went wrong');
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
    <div className="branch-div1">
      <HeaderComp />
      <div className="repo-div">
        <div className="search-bar">
          <input
            placeholder="Enter branch name"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Deploy</button>
        </div>
        <div className="branch">
          <table>
            <thead>
              <tr>
                <th>Branch</th>
              </tr>
              {branch
              && showAllBranches
              && branch.map((items) => (
                <tr key={items.name}>
                  <th>{items.name}</th>
                </tr>
              ))}
              {searchedBranches
              && !showAllBranches
              && searchedBranches.map((branchItem) => (
                <tr key={branchItem.name}>
                  <td>{branchItem.name}</td>
                </tr>
              ))}
            </thead>
          </table>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Branch;
