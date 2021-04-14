import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const login = localStorage.getItem("login");

  return (
    <Route
      {...rest}
      render={(props) =>
        login ? <Component {...props} /> : <Redirect to="/signIn" />
      }
    />
  );
};

export default ProtectedRoute;
