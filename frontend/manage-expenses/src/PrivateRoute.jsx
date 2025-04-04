import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ({  element: Component }) => {

  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    console.log(token)
    return token !== null; // tokenIsValid es una función que valida el token
  };

  return isAuthenticated() ? <Component /> : <Navigate to="/" />;
};