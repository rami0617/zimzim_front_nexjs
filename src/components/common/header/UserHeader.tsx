import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from '#components/common/Button';

import { authApi, usePostLogoutMutation } from '#/api/services/authApi';

import ROUTE from '#/constants/route';

import UserIcon from '#assets/icon/user.svg?react';
import LogoutIcon from '#assets/icon/logout.svg?react';
import CIIcon from '#assets/icon/icon.svg?react';
import { twMerge } from 'tailwind-merge';
import { HEADER_ICON, HEADER_ICON_BUTTON } from '#/constants/style';

const UserHeader = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [logout] = usePostLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();

      dispatch(authApi.util.invalidateTags([{ type: 'User', id: 'User' }]));
      navigate(ROUTE.LOGIN);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between w-full h-16 bg-white items-center px-8">
      <div className="flex flex-row items-center w-32 justify-center">
        <NavLink to={ROUTE.MAIN_PAGE}>
          <CIIcon width={48} height={48} />
        </NavLink>
      </div>
      <div className="flex flex-row gap-4">
        <NavLink to={ROUTE.USER}>
          <div className={twMerge(HEADER_ICON_BUTTON, 'rounded-full')}>
            <UserIcon width={20} height={20} className={HEADER_ICON} />
          </div>
        </NavLink>
        <Button
          className={twMerge(HEADER_ICON_BUTTON, 'rounded-md')}
          onClick={handleLogout}
        >
          <LogoutIcon width={20} height={20} className={HEADER_ICON} />
        </Button>
      </div>
    </div>
  );
};

export default UserHeader;
