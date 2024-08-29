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
  }, []);

  return (
    <div className="w-screen h-screen bg-secondary-light/25">
      <div className="w-screen h-screen flex flex-row">
        <Menu />
        <div className="w-5/6 flex flex-col h-full">
          <UserHeader />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
