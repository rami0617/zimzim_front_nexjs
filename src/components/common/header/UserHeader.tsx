import React from 'react';
import { NavLink } from 'react-router-dom';

import UserIcon from '#assets/icon/user.svg?react';

const UserHeader = () => (
  <div className="flex gap-4 justify-end h-20 bg-white items-center px-6">
    <div className="flex flex-row items-center gap-4">
      <NavLink to="/user">
        <div className="bg-secondary-light/70 p-2 rounded-full border-1 hover:bg-secondary-light">
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
);

export default UserHeader;
