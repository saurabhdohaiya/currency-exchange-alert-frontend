import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
