import React from 'react';
import { Outlet } from 'react-router-dom';

import Menu from '#components/common/menu/Menu';
import UserHeader from '#components/common/header/UserHeader';

const UserLayout = () => (
  <div className="w-screen h-screen bg-secondary-light/25">
    <div className="w-screen h-screen flex flex-row">
      <Menu />
      <div className="w-5/6 flex flex-col">
        <UserHeader />
        <Outlet />
      </div>
    </div>
  </div>
);

export default UserLayout;
