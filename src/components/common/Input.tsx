import React, { ReactNode, forwardRef, useState, useEffect } from 'react';

import ErrorMessage from '#components/common/ErrorMessage';

interface InputProps {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  placeholder: string;
  children?: ReactNode;
  type?: string;
  label?: string;
  errorMessage?: string;
  value?: string;
  defaultValue?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
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
      value,
      defaultValue = '',
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<string>(defaultValue);

    const isControlled = value !== undefined;

    useEffect(() => {
      if (isControlled && value !== undefined) {
        setInternalValue(value);
      }
    }, [value, isControlled]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(event.target.value);
      }
      onChange?.(event);
    };

    return (
      <div className="py-1.5">
        <div className="flex flex-col gap-1">
          <label className="text-neutral-500">{label}</label>
          <div className="relative">
            <input
              name={label}
              type={type}
              className={`border-1 border-gray-dark rounded-lg h-12 w-full pl-4 ${className}`}
              onChange={handleChange}
              placeholder={placeholder}
              autoComplete={autoComplete}
              ref={ref}
              value={isControlled ? value : internalValue}
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
