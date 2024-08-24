import React, { ReactNode, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setNavigateFunction } from '#/api/axios';

import { getUserInfo } from '#/stores/user/action';
import { AppDispatch, RootState } from '#/stores/store';

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setNavigateFunction(navigate);
  }, [navigate]);

  useEffect(() => {
    if (!user) {
      dispatch(getUserInfo());
    }
  }, [dispatch, user]);

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
