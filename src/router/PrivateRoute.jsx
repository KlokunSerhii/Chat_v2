import React from 'react';
import { Navigate } from 'react-router-dom';
import { Loader } from '../components/ChatApp/ChatApp.styled';

export default function PrivateRoute({ isLoggedIn, isAuthChecked, children }) {
  if (!isAuthChecked) return <Loader />;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
