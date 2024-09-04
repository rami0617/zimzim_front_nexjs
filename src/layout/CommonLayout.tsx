import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '#components/common/header/Header';

const CommonLayout = () => (
  <div className="min-h-screen w-screen bg-gradient-to-br from-secondary-light to-secondary-dark px-16 pt-8 flex flex-col justify-between">
    <Header />
    <Outlet />
  </div>
);

export default CommonLayout;
