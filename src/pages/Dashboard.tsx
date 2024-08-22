import React from 'react';
import { NavLink } from 'react-router-dom';

import UserIcon from '#assets/icon/user.svg?react';

const Dashboard = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-bg-light to-bg-dark">
      <header className=" w-10 justify-center  items-center border-b-1 border-slate-900/10 bg-white">
        <nav className="  justify-center items-center">
          <NavLink to="/dashboard" className="px-2">
            <img
              src="src/assets/icon/icon.svg"
              alt="icon"
              style={{ width: 48, height: 48 }}
            />
          </NavLink>
          <div className="  items-center">
            <NavLink to="/exercise">
              <div className="text-xl">Exercise</div>
            </NavLink>
            <NavLink to="/exercise">
              <div className="text-xl">Water</div>
            </NavLink>
          </div>
          {/* <div className="flex gap-4 justify-end">
            <NavLink to="/exercise">
              <div className="bg-[#ABC4FF] p-2 rounded-full border-1 border-gray-dark">
                <UserIcon width={24} height={24} className="text-gray-600" />
              </div>
            </NavLink>
          </div> */}
        </nav>
      </header>
    </div>
  );
};

export default Dashboard;
