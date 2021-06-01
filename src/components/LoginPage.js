import React from 'react';
import '../assets/css/loginPage.css';

export default function LoginPage() {

    const newTab = (url) => { 
        window.open(url, "_blank"); 
    } 

    const handleClick = (e) => {
        fetch("https://github.com/login/oauth/authorize?client_id=xxxxxxxxxxxxx",
        {
            method: "GET"
        }
        )
        .then(response => {
            console.log(response)
            newTab(response.url)
        })
        .catch(err => { 
            console.log(err); 
        });
    }

    return (
        <div className="login-page">
            <div className="login-form-div">
                <div className="login-form-left-section">
                    <div className="left-section">
                        <h1>Welcome to OAuth App</h1>
                    </div>
                </div>
                <div className="login-form-right-section">   
                    <div className="sign-in-div">
                        <h1>Sign in</h1>
                        <div className="sign-in-form">
                            <button onClick={(e) => handleClick(e)}>
                                Login with <i class="icon-github"></i> GitHub
                            </button>
                            <button>
                                Login with GitLab
                            </button>
                            <button>
                                Login with BitBucket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}