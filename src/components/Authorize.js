/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-escape */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AppContainer(props) {
  const history = useHistory();
  const navigateTo = () => history.push('/repositories');

  const getParameterByName = (name, url) => {
    if (!url) {
      url = 'http://localhost:3000/login/oauth/authorize?code=22420353c9c197911558';
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  const getInfo = (code) => {
    fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/github_oauth/authorise_user?code=${code}`,
      {
        method: 'GET',
      },
    ).then((response) => response.json())
      .then((jsondata) => {
        localStorage.setItem('AccessToken', jsondata.user.access_token);
        navigateTo();
      })
      .catch((err) => {
        if (err) {
          toast.error('Something went wrong', {
            className: 'error-toast',
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  };

  useEffect(() => {
    const check = getParameterByName('code', window.location.href);
    getInfo(check);
  });

  return (
    <div className="homepage">
      <div className="parent-div">
        <div className="branch-div">
          <h2>DeployDash</h2>
          <ToastContainer />
        </div>
      </div>
      <Spinner animation="border" variant="secondary" />
    </div>
  );
}
