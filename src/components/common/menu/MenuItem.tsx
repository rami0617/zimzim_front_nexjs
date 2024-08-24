import React, { SVGProps, FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

interface MenuItemProps {
  to: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
}

const MenuItem = ({ to, Icon, title }: MenuItemProps) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        clsx('group flex flex-row h-12 p-2 items-center gap-3 rounded-lg ', {
          'bg-bg-light/70 text-white': isActive,
          'hover:bg-bg-light/70 hover:text-white text-gray-600': !isActive,
        })
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            width={24}
            height={24}
            className={clsx('group-hover:text-white', {
              'text-white': isActive,
              'text-gray-600': !isActive,
            })}
          />
          <div className="text-xl">{title}</div>
        </>
      )}
    </NavLink>
  );
};

export default MenuItem;
