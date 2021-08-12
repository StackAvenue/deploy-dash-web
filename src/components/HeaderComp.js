import { React, useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import API from '../services/API';

export default function Header() {
  const [userName, setUserName] = useState('Loading');
  const [userData, setUserData] = useState(null);
  const history = useHistory();
  const navigateTo = () => history.push('/');

  const getUserDetails = () => {
    API.getUserDetails().then((res) => {
      setUserName(res.user.login);
      setUserData(res.user);
    }).catch(() => {
      toast.error('Something went wrong');
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const signOut = () => {
    window.localStorage.removeItem('AccessToken');
    navigateTo();
  };

  const resyncPage = () => {
    // eslint-disable-next-line no-restricted-globals
    window.location.reload();
  };

  return (
    <div className="homepage">
      <div className="parent-div">
        <div className="branch-div">
          <h2>DeployDash</h2>
          <div className="user">
            <h5 className="user-name">{userName}</h5>
            <div className="avatar">
              <img src={userData != null ? userData.avatar_url : ''} alt="" />
            </div>
            <DropdownButton
              menuAlign="right"
              title=""
              id="dropdown-menu-align-right"
            >
              <Dropdown.Item eventKey="1" onClick={(e) => resyncPage(e)}>Re-sync</Dropdown.Item>
              <Dropdown.Item eventKey="4" onClick={(e) => signOut(e)}>Sign out</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
