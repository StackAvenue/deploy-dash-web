import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import API from '../../services/API';

function RepoComp() {
  const [repos, setRepos] = useState([]);
  const [showAllRepos, setShowAllRepos] = useState(true);
  const [searchedRepos, setSearchedRepos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getRepos = () => {
    API.getRepos().then((res) => {
      setRepos(res.repositories);
    }).catch(() => {
      toast.error('Something went wrong', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }).finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getRepos();
  }, []);

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
    <>
      {isLoading ? <Spinner animation="border" variant="secondary" />
        : (
          <>
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
                      <td><Link to={`/repositories/${repo.full_name}/branch`}>{repo.name}</Link></td>
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
          </>
        )}
    </>
  );
}

export default RepoComp;
