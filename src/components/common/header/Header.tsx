import React from 'react';
import { NavLink } from 'react-router-dom';

import CIIcon from '#assets/icon/icon.svg?react';
import ROUTE from '#/constants/route';

const Header = () => (
  <header>
    <div className="w-16">
      <NavLink to={ROUTE.MAIN_PAGE}>
        <CIIcon width={52} height={52} />
      </NavLink>
    </div>
  </header>
);

export default Header;
