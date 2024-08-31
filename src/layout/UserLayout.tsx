import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Menu from '#components/common/menu/Menu';
import UserHeader from '#components/common/header/UserHeader';

import { getUserInfo } from '#/stores/user/action';
import { AppDispatch, RootState } from '#/stores/store';

const UserLayout = () => {
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!userId) {
      dispatch(getUserInfo());
    }
  }, [dispatch, userId]);

  return (
    <div className="min-h-screen w-screen flex flex-col bg-secondary-light/50">
      <UserHeader />
      <div className="flex flex-1 overflow-hidden">
        <Menu />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
