/* eslint-disable */
// import React, { useState } from 'react';

// export default function Auth() {
//     const[authenticated, setAuthenticated] = useState(true)

//     const login = (cb) => {
//         authenticated = true
//         cb()
//     }

//     const logout = (cb) => {
//         authenticated = false
//         cb()
//     }

//     isAuthenticated = () => {
//         console.log('checking')
//         return authenticated
//     }

// }

class Auth {
    constructor() {
        this.isAuthenticated = true
    }

    login(cb) {
        this.isAuthenticated = true
        cb()
    }

    logout(cb) {
        this.isAuthenticated = false
        cb()
    }

    isAuthenticated() {
        return this.isAuthenticated
    }
}

export default new Auth();
