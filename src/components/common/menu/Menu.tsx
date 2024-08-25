import React from 'react';
import { NavLink } from 'react-router-dom';

import MenuItem from '#components/common/menu/MenuItem';

import ChartIcon from '#assets/icon/chart.svg?react';
import ExerciseIcon from '#assets/icon/exercise.svg?react';
import WaterIcon from '#assets/icon/water.svg?react';

const Menu = () => (
  <header className="w-1/6 justify-center algin-center border-b-1 border-slate-900/10 bg-white">
    <nav className="h-full flex flex-col gap-6 pt-4 items-center">
      <div className="p-2">
        <NavLink
          to="/"
          end
          className="flex flex-row justify-center items-center gap-2"
        >
          <img
            src="src/assets/icon/icon.svg"
            alt="icon"
            style={{ width: 48, height: 48 }}
          />
        </NavLink>
      </div>
      <div className="flex flex-col gap-8 w-5/6 text-gray-600">
        <MenuItem to="/" title="Dashboard" Icon={ChartIcon} />
        <MenuItem to="/exercise" title="Exercise" Icon={ExerciseIcon} />
        <MenuItem to="/water" title="Water" Icon={WaterIcon} />
      </div>
    </nav>
  </header>
);

export default Menu;
