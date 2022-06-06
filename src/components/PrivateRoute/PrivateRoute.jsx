import React from "react";

import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
  const { logged, loading } = useSelector(state => state.auth);
  if (loading) {
    return null
  } else {
    if (logged) {
      return children
    } else {
      return <Navigate to="/login" />
    }
  }
}