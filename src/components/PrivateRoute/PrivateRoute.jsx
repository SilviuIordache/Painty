import React from "react";

import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
  const { currentUser } = useSelector(state => state.auth);
  return currentUser ? children : <Navigate to="/login" />;
}