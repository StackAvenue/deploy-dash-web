import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';
import API from '../../services/API';

export default function AppContainer() {
  const history = useHistory();
  const navigateTo = () => history.push('/repositories');
  const { search } = useLocation();

  const getParameterByName = () => {
    const name = new URLSearchParams(search).get('code');
    return name;
  };

  const getInfo = (code) => {
    API.getInfo(code).then((res) => {
      localStorage.setItem('AccessToken', res.user.access_token);
      navigateTo();
      toast.success('Successfully logged in', {
        position: 'top-right',
        autoClose: 2000,
      });
    }).catch(() => {
      toast.error('Something went wrong');
    });
  };

  useEffect(() => {
    const check = getParameterByName();
    getInfo(check);
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
