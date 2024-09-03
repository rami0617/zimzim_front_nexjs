import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { setNavigateFunction } from '#/api/axios';
import { useGetUserInfoQuery } from '#/api/services/userApi';

const AuthGuard = () => {
  const navigate = useNavigate();

  const { data, isLoading, isSuccess } = useGetUserInfoQuery();

  useEffect(() => {
    setNavigateFunction(navigate);
  }, [navigate]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (
    !data &&
    isSuccess &&
    location.pathname !== '/login' &&
    location.pathname !== '/sign-up'
  ) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default AuthGuard;
