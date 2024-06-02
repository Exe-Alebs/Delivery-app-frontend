import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../config/hooks/useAuth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
