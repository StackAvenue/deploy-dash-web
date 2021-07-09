/* eslint-disable */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../Auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        // if(auth.isAuthenticated()) {
        if (window.localStorage.getItem("AccessToken")) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
