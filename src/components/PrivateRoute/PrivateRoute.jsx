import React from "react";

import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
  const { currentUser, logged } = useSelector(state => state.auth);
  if (!logged)
    return null
  return currentUser ? children : <Navigate to="/login" />
}