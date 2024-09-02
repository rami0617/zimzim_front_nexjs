import React from 'react';
import { Outlet } from 'react-router-dom';

import Menu from '#components/common/menu/Menu';
import UserHeader from '#components/common/header/UserHeader';

import { useGetUserInfoQuery } from '#/api/userApi';

const UserLayout = () => {
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
