import React, { useEffect } from 'react';
import '../../assets/scss/loginPage.scss';
import { useHistory } from 'react-router-dom';

export default function LoginPage() {
  const history = useHistory();
  const navigateTo = () => history.push('/repositories');

  const newTab = (url) => {
    window.open(url, '_parent');
  };

  const handleClick = async () => {
    fetch(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`,
      {
        method: 'GET',
      },
    )
      .then((response) => {
        newTab(response.url);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  useEffect(() => {
    if (window.localStorage.getItem('AccessToken')) {
      navigateTo();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login-page">
      <div className="login-form-div">
        <div className="login-form-left-section">
          <div className="left-section">
            <h1>Welcome to DeployDash</h1>
          </div>
        </div>
        <div className="login-form-right-section">
          <div className="sign-in-div">
            <h1>Sign in with</h1>
            <div className="sign-in-form">
              <button type="button" onClick={(e) => handleClick(e)}>
                <i className="fa fa-github icon" aria-hidden="true" />
                {' '}
                GitHub
              </button>
              <button type="button">
                <i className="fa fa-gitlab icon" aria-hidden="true" />
                {' '}
                GitLab
              </button>
              <button type="button">
                <i className="fa fa-bitbucket icon" aria-hidden="true" />
                {' '}
                BitBucket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}