import React from 'react';
import '../assets/scss/loginPage.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const newTab = (url) => {
    window.open(url, '_blank');
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
        if (err) {
          toast.warning('Something went wrong', {
            className: 'error-toast',
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

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
              <ToastContainer autoClose={13000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
