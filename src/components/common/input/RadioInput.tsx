import React from 'react';

interface RadioInputProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}

const RadioInput = ({
  name,
  value,
  checked,
  onChange,
  label,
}: RadioInputProps) => {
  return (
    <div>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label className="pl-2">{label}</label>
    </div>
  );
};

export default RadioInput;
