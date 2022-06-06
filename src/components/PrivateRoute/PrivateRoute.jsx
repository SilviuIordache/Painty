import React from "react";

import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
  const { logged, loading } = useSelector(state => state.auth);

  if (loading) {
    return null
  }
  return logged ? children : <Navigate to="/login" />
}