import React, { ReactNode } from 'react';

const Button = ({
  type = 'button',
  onClick,
  className = '',
  children,
  ...props
}: {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <button type={type} onClick={onClick} className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
