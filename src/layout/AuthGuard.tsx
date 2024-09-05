import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { setNavigateFunction } from '#/api/axios';
import { useGetUserInfoQuery } from '#/api/services/userApi';

import ROUTE from '#/constants/route';

const AuthGuard = () => {
  const navigate = useNavigate();

  const { data, isSuccess } = useGetUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    setNavigateFunction(navigate);
  }, [navigate]);

  if (
    !data &&
    isSuccess &&
    location.pathname !== ROUTE.LOGIN &&
    location.pathname !== ROUTE.SIGN_UP
  ) {
    return <Navigate to={ROUTE.LOGIN} />;
  }

  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default AuthGuard;
