import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <NavLink to="/">
      <img
        src="src/assets/icon/icon.svg"
        alt="icon"
        style={{ width: 48, height: 48 }}
      />
    </NavLink>
  </header>
);

export default Header;
