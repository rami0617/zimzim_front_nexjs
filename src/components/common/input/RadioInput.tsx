import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  id?: string;
}

const RadioInput = ({
  name,
  value,
  checked,
  onChange,
  label,
  id,
  ...props
}: RadioInputProps) => {
  const inputId = id ?? `${name}-${value}`;

  return (
    <div>
      <input
        id={inputId}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <label className="pl-2" htmlFor={inputId}>
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
