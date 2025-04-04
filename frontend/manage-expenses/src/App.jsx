import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashBoard } from './DashBoard';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { SignupPage } from './SignupPage';
import { PrivateRoute } from './PrivateRoute';



export const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/dashboard',
      // element: <PrivateRoute isAuthenticated={isAuthenticated()} />,
      // children: [
        // {
          // path: '/dashboard',
      element: <PrivateRoute element={DashBoard} />
        // }
      // ]
              
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/signup',
      element: <SignupPage />
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}