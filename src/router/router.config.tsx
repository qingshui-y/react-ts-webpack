import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import BasicLayout from '@/layouts';
import Login from '@/pages/login';
import Admin from '@/pages/admin';

const List = lazy(() => import('@/pages/list'));

const routerConfig = [
  { path: 'login', element: <Login /> },
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        path: 'list',
        element: (
          <Suspense fallback={<div>loading...</div>}>
            <List />
          </Suspense>
        )
      },
      { path: 'admin', element: <Admin /> },
      { path: '*', element: <Navigate to='login' /> } // Redirect
    ]
  }
];

export default routerConfig;
