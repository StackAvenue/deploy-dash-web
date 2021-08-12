import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import API from '../../services/API';

function BranchComp() {
  const [branch, setBranch] = useState([]);
  const RepoName = useParams();
  const [showAllBranches, setShowAllBranches] = useState(true);
  const [searchedBranches, setSearchedBranches] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getBranch = () => {
    API.getBranch(RepoName)
      .then((jsondata) => {
        setBranch(jsondata.branches);
      }).catch(() => {
        toast.error('Something went wrong');
      }).finally(() => {
        setIsLoading(false);
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
    <>
      {isLoading ? <Spinner animation="border" variant="secondary" />
        : (
          <>
            <div className="search-bar">
              <input
                placeholder="Enter branch name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="branch">
              <table>
                <thead>
                  <tr>
                    <th>Branch</th>
                  </tr>
                </thead>
                <tbody>
                  {branch
              && showAllBranches
              && branch.map((items) => (
                <tr key={items.name}>
                  <td>{items.name}</td>
                </tr>
              ))}
                  {searchedBranches
              && !showAllBranches
              && searchedBranches.map((branchItem) => (
                <tr key={branchItem.name}>
                  <td>{branchItem.name}</td>
                </tr>
              ))}
                </tbody>
              </table>
              <ToastContainer />
            </div>
          </>
        )}
    </>
  );
}

export default BranchComp;
