import axios from 'axios';
// import { useParams } from 'react-router-dom';
import { SERVICE_URL, CLIENT_ID } from '../utils/Constants';
import 'react-toastify/dist/ReactToastify.css';

const URL = SERVICE_URL;

const API = {
  async handleUserLogin() {
    const res = await axios
      .get(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
    return res;
  },

  async getRepos() {
    const res = await axios
      .get(`${URL}/users/repositories`, {
        headers: {
          Authorization: window.localStorage.getItem('AccessToken'),
        },
      });
    return res.data;
  },

  async getUserDetails() {
    const res = await axios
      .get(`${URL}/users`, {
        headers: {
          Authorization: window.localStorage.getItem('AccessToken'),
        },
      });
    return res.data;
  },

  async getInfo(code) {
    const res = await axios
      .get(`${URL}/github_oauth/authorise_user?code=${code}`, {
        headers: {
          Authorization: window.localStorage.getItem('AccessToken'),
        },
      });
    return res.data;
  },

  async getBranch(RepoName) {
    const res = await axios
      .get(`${URL}/users/branches?full_name=${RepoName.userName}/${RepoName.repoName}`, {
        headers: {
          Authorization: window.localStorage.getItem('AccessToken'),
        },
      });
    return res.data;
  },

};

export default API;
