import React from 'react';
import { NavLink } from 'react-router-dom';

import CIIcon from '#assets/icon/icon.svg?react';

const Header = () => (
  <header className="w-[60px]">
    <NavLink to="/">
      <CIIcon width={48} height={48} />
    </NavLink>
  </header>
);

export default Header;
