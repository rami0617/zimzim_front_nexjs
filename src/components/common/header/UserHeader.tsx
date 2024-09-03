import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from '#components/common/Button';

import UserIcon from '#assets/icon/user.svg?react';
import LogoutIcon from '#assets/icon/logout.svg?react';
import CIIcon from '#assets/icon/icon.svg?react';

const UserHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex gap-4 justify-between w-full h-16 bg-white items-center">
      <div className="flex flex-row items-center w-48 justify-center">
        <NavLink to="/">
          <CIIcon width={48} height={48} />
        </NavLink>
      </div>
      <div className="flex flex-row gap-4 pr-8">
        <NavLink to="/user">
          <div className="bg-secondary-light/50 p-2 rounded-full border-1 hover:bg-secondary-light">
            <UserIcon
              width={20}
              height={20}
              className="text-gray-600 group-hover:text-white"
            />
          </div>
        </NavLink>
        <Button
          className="flex flex-row gap-2 rounded-md bg-secondary-light/50 p-2 border-1 hover:bg-secondary-light p-2"
          onClick={handleLogout}
        >
          <LogoutIcon
            width={20}
            height={20}
            className="text-gray-600 group-hover:text-white"
          />
        </Button>
      </div>
    </div>
  );
};

export default UserHeader;
