import React from "react";
import "../assets/css/loginPage.css";

export default function LoginPage() {


  const newTab = (url) => {
    window.open(url, "_blank");
  };

  const handleClick = (e) => {
    fetch(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`,
      {
        method: "GET",
      }
    ).then((response) => {
        console.log(response);
        newTab(response.url);
      })
      .catch((err) => {
        console.log(err);
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
              <button onClick={(e) => handleClick(e)}>
                <i className="fa fa-github icon" aria-hidden="true"></i> GitHub
              </button>
              <button>
                <i className="fa fa-gitlab icon" aria-hidden="true"></i> GitLab
              </button>
              <button>
                <i className="fa fa-bitbucket icon" aria-hidden="true"></i>{" "}
                BitBucket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}