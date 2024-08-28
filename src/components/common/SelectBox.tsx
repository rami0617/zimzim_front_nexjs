import React, { forwardRef, ChangeEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import ErrorMessage from '#components/common/ErrorMessage';

import ArrowDownIcon from '#assets/icon/angle-down-solid.svg?react';
import ArrowUPIcon from '#assets/icon/angle-up-solid.svg?react';

interface SelectBoxProps {
  label: string;
  options: Option[];
  selectId: string;
  selectName: string;
  className?: string;
  selectClassName?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  errorMessage?: string;
  placeHolder: string;
}

type Option = {
  value: string;
  name: string;
};

const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  (
    {
      label,
      options,
      selectId,
      selectName,
      className = '',
      selectClassName = '',
      onChange,
      errorMessage = '',
      placeHolder,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [internalValue, setInternalValue] = useState<string | undefined>(
      undefined,
    );

    const handleSelect = (value: Option['value']) => {
      setIsOpen(false);
      setInternalValue(value);

      if (onChange) {
        onChange({
          target: { value, name: selectName, id: selectId },
        } as ChangeEvent<HTMLSelectElement>);
      }
    };

    return (
      <div className="flex flex-col align-center">
        <div
          className={twMerge(
            `flex flex-col justify-between items-center ${className}`,
          )}
        >
          <label className="text-neutral-500" htmlFor={selectId}>
            {label}
          </label>
          <div
            className={twMerge(
              `relative border-1 border-gray-dark px-4 h-12 inline-block content-center rounded-lg cursor-pointer ${selectClassName}`,
            )}
          >
            <div
              className={twMerge(
                `selected flex justify-between items-center ${internalValue ?? 'text-gray-dark'}`,
              )}
              onClick={() => setIsOpen(true)}
            >
              <span>{internalValue ?? placeHolder}</span>
              {!isOpen && <ArrowDownIcon width={12} />}
              {isOpen && <ArrowUPIcon width={12} />}
            </div>
            {isOpen && (
              <ul className="options absolute left-0 right-0 mt-3.5 z-10 bg-white border-gray-dark last:border-b-1 border-t-1 border-l-1 border-r-1 rounded-md">
                {options.map((option) => (
                  <li
                    key={option.name}
                    className="option px-4 py-1"
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <ErrorMessage message={errorMessage ?? ''} />
      </div>
    );
  },
);

export default SelectBox;
