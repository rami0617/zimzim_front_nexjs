import React, { ReactNode } from 'react';

import Header from '#/components/common/Header';

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-bg-light to-bg-dark px-16 pt-10 pb-14">
      <Header />
      {children}
    </div>
  );
};

export default CommonLayout;
