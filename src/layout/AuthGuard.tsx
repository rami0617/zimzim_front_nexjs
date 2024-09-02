import React, { ReactNode, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { setNavigateFunction } from '#/api/axios';

import { RootState } from '#/stores/store';

const AuthGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigateFunction(navigate);
  }, [navigate]);

  // if (
  //   // !user &&
  //   location.pathname !== '/login' &&
  //   location.pathname !== '/sign-up'
  // ) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default AuthGuard;
