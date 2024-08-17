import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '#stores/store';

const App = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.token !== null,
  );
  const location = useLocation();

  if (
    !isAuthenticated &&
    location.pathname !== '/login' &&
    location.pathname !== '/sign-up'
  ) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="font-roboto">
      <Outlet />
    </main>
  );
};

export default App;
