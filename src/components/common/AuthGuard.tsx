import React, { ReactNode, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { setNavigateFunction } from '#/api/axios';

import { RootState } from '#/stores/store';

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setNavigateFunction(navigate);
  }, [navigate]);

  if (
    !user &&
    location.pathname !== '/login' &&
    location.pathname !== '/sign-up'
  ) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};

export default AuthGuard;
