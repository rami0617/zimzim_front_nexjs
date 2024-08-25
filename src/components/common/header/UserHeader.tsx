import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from '#components/common/Button';

import { resetAuth } from '#/stores/auth/slice';
import { resetUser } from '#/stores/user/slice';
import { resetExercise } from '#/stores/exercise/slice';

import UserIcon from '#assets/icon/user.svg?react';
import LogoutIcon from '#assets/icon/logout.svg?react';

const UserHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(resetAuth());
    dispatch(resetExercise());
    dispatch(resetUser());
    navigate('/login');
  };

  return (
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
        <Button
          className="flex flex-row gap-2 rounded-md bg-secondary-light/70 p-2 border-1 hover:bg-secondary-light"
          onClick={handleLogin}
        >
          <LogoutIcon
            width={20}
            height={20}
            className="text-gray-600 group-hover:text-white"
          />
          <p className="text-sm">Sign out</p>
        </Button>
      </div>
    </div>
  );
};

export default UserHeader;
