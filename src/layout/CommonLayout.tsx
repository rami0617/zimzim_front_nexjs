import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '#/components/common/header/Header';

const CommonLayout = () => (
  <div className="w-screen h-screen bg-gradient-to-br from-secondary-light to-secondary-dark px-16 pt-10 pb-14">
    <Header />
    <Outlet />
  </div>
);

export default CommonLayout;
