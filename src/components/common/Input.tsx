import React, {
  ReactNode,
  forwardRef,
  useState,
  useEffect,
  ChangeEvent,
} from 'react';
import { twMerge } from 'tailwind-merge';

import ErrorMessage from '#components/common/ErrorMessage';

interface InputProps {
  className?: string;
  inputClassName?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
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
      className = '',
      inputClassName = '',
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
      <div className="flex flex-col align-center">
        <div
          className={twMerge(
            `flex flex-col gap-1 justify-between align-center ${className}`,
          )}
        >
          <label className="text-neutral-500">{label}</label>
          <div className="relative">
            <input
              name={label}
              type={type}
              className={twMerge(
                `border-1 border-gray-dark rounded-lg h-12 w-full px-4 ${inputClassName}`,
              )}
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
