import React, { ReactNode } from 'react';

const Input = ({
  className,
  onChange,
  autoComplete = 'off',
  placeholder,
  type = 'text',
  children,
  ...props
}: {
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  placeholder: string;
  children?: ReactNode;
  type?: string;
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        className={`border-1 border-gray-dark rounded-lg h-12 w-full pl-11 ${className}`}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...props}
      />
      {children}
    </div>
  );
};

export default Input;
