import React, { ReactNode, useEffect } from 'react';

import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getUserInfo } from '#stores/user/actions';
import { AppDispatch, RootState } from '#/stores/store';

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

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

  return <>{children}</>;
};

export default AuthGuard;
