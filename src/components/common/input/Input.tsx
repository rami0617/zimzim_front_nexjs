import React, { ReactNode, Ref, forwardRef } from 'react';
import ErrorMessage from '../ErrorMessage';

const Input = forwardRef<
  HTMLInputElement,
  {
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    autoComplete?: string;
    placeholder: string;
    children?: ReactNode;
    type?: string;
    label?: string;
    errorMessage?: string;
    // label: Path<T>;
    // register: UseFormRegister;
    // required: boolean;
  }
>(
  (
    {
      className,
      onChange,
      autoComplete = 'off',
      placeholder,
      type = 'text',
      children,
      label,
      errorMessage,
      // register,
      // required,
      ...props
    },
    ref,
  ) => {
    return (
      <div>
        <div className="flex flex-col gap-1">
          <label className="text-neutral-500">{label}</label>
          <div className="relative">
            <input
              name={label}
              type={type}
              className={`border-1 border-gray-dark rounded-lg h-12 w-full pl-4 ${className}`}
              onChange={onChange}
              placeholder={placeholder}
              autoComplete={autoComplete}
              ref={ref}
              {...props}
            />
            {children}
          </div>
        </div>
        <ErrorMessage message={errorMessage ?? ''} />
      </div>
    );
  },
);

export default Input;
