import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '#/App';

import Landing from '#/pages/Landing';
import SignUp from '#/pages/SignUp';

import '#/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Landing />,
      },
    ],
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<RouterProvider router={router} />);
