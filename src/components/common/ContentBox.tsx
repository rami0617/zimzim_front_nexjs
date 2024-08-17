import React, { ReactNode } from 'react';

const ContentBox = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col w-2/6 justify-between bg-white px-8 py-8 border-1 border-gray-light ${className}`}
    >
      {children}
    </div>
  );
};

export default ContentBox;
