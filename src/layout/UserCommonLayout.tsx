import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import UserIcon from '#assets/icon/user.svg?react';
import ChartIcon from '#assets/icon/chart.svg?react';
import ExerciseIcon from '#assets/icon/exercise.svg?react';
import WaterIcon from '#assets/icon/water.svg?react';

const UserCommonLayout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="w-screen h-screen bg-bg-light/25 flex">
      <header className="w-1/6 justify-center algin-center border-b-1 border-slate-900/10 bg-white">
        <nav className="h-full flex flex-col gap-6 pt-4 items-center">
          <div className="p-2">
            <NavLink
              to="/"
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
            <NavLink
              to="/"
              className={({ isActive }) =>
                `group flex flex-row h-12 p-2 items-center gap-3 rounded-lg ${
                  isActive
                    ? 'bg-bg-light/70 text-white'
                    : 'hover:bg-bg-light/70 hover:text-white'
                }`
              }
            >
              <ChartIcon
                width={24}
                height={24}
                className="text-gray-600 group-hover:text-white group-visited:text-white"
              />
              <div className="text-xl text-left">Dashboard</div>
            </NavLink>
            <NavLink
              to="/exercise"
              className={({ isActive }) =>
                `group flex flex-row h-12 p-2 items-center gap-3 rounded-lg ${
                  isActive
                    ? 'bg-bg-light/70 text-white'
                    : 'hover:bg-bg-light/70 hover:text-white'
                }`
              }
            >
              <ExerciseIcon
                width={24}
                height={24}
                className="text-gray-600 group-hover:text-white"
              />
              <div className="text-xl">Exercise</div>
            </NavLink>
            <NavLink
              to="/water"
              className={({ isActive }) =>
                `group flex flex-row h-12 p-2 items-center gap-3 rounded-lg ${
                  isActive
                    ? 'bg-bg-light/70 text-white'
                    : 'hover:bg-bg-light/70 hover:text-white'
                }`
              }
            >
              <WaterIcon
                width={24}
                height={24}
                className="text-gray-600 group-hover:text-white"
              />
              <div className="text-xl">Water</div>
            </NavLink>
          </div>
        </nav>
      </header>
      <div className="w-5/6 flex flex-col">
        <div className="flex gap-4 justify-between h-20 bg-white items-center px-6">
          <div className="text-xl">{title}</div>
          <div className="flex flex-row items-center gap-4">
            <NavLink to="/user" className="group">
              <div className="bg-bg-light/70 p-2 rounded-full border-1 hover:bg-bg-light">
                <UserIcon
                  width={24}
                  height={24}
                  className="text-gray-600 group-hover:text-white"
                />
              </div>
            </NavLink>
            <p onClick={() => {}} className="text-gray-600">
              logout
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default UserCommonLayout;
