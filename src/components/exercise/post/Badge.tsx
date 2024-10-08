import React, { ReactNode } from 'react';

interface BadgeProps {
  content: string;
  children: ReactNode;
}

const Badge = ({ content, children }: BadgeProps) => {
  return (
    <span className="inline-flex rounded-md bg-blue-50 px-2 py-3 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/101 items-center gap-1">
      <p>{content}</p>
      {children}
    </span>
  );
};

export default Badge;
