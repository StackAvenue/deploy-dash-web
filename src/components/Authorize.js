/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-escape */
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

export default function AppContainer(props) {
  const history = useHistory();
  const navigateTo = () => history.push('/repositories');
  const { search } = useLocation();

  const getParameterByName = () => {
    // if (!url) {
    //   url = 'http://localhost:3000/login/oauth/authorize?code=22420353c9c197911558';
    // }
    // name = name.replace(/[\[\]]/g, '\\$&');
    // const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    // const results = regex.exec(url);
    // if (!results) return null;
    // if (!results[2]) return '';
    // return decodeURIComponent(results[2].replace(/\+/g, ' '));
    const name = new URLSearchParams(search).get('code');
    return name;
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
      });
  };

  useEffect(() => {
    // if (window.localStorage.getItem('AccessToken')) {
    //   navigateTo();
    // } else {
    const check = getParameterByName();
    getInfo(check);
    // }
  });

  return (
    <div className="homepage">
      <div className="parent-div">
        <div className="branch-div">
          <h2>DeployDash</h2>
        </div>
      </div>
      <Spinner animation="border" variant="secondary" />
    </div>
  );
}
