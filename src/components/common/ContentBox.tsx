import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ContentBoxProps {
  children: ReactNode;
  className?: string;
}

const ContentBox = ({ children, className = '' }: ContentBoxProps) => (
  <div
    className={twMerge(
      `flex flex-col w-2/6 justify-between bg-white px-8 py-8 border-1 border-gray-light ${className}`,
    )}
  >
    {children}
  </div>
);

export default ContentBox;
