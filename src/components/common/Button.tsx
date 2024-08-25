import React, { ReactNode } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

const Button = ({
  type = 'button',
  onClick,
  className = '',
  children,
  ...props
}: ButtonProps) => (
  <button type={type} onClick={onClick} className={className} {...props}>
    {children}
  </button>
);

export default Button;
