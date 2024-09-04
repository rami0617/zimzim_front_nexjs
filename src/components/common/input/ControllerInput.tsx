import { ExercisePostFormInput } from '#/components/exercise/post/ExerciseForm';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import Input from './Input';

interface ControllerInputProps {
  name: keyof ExercisePostFormInput;
  control: Control<ExercisePostFormInput, any>;
  placeholder: string;
  error: any;
  label: string;
  type: string;
  defaultValue: string;
  inputClassName?: string;
  max?: string | number;
  min?: number;
  disabled?: boolean;
}

const ControllerInput = ({
  name,
  control,
  placeholder,
  error,
  label,
  type,
  defaultValue,
  inputClassName,
  max,
  disabled,
  min,
  ...rest
}: ControllerInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ''}
      render={({ field }) => (
        <Input
          {...field}
          label={label}
          type={type}
          placeholder={placeholder}
          inputClassName={inputClassName}
          className="flex-row items-center"
          errorMessage={error?.message}
          max={max}
          min={min}
          disabled={disabled}
          value={field.value ?? ''}
          {...rest}
        />
      )}
    />
  );
};

export default ControllerInput;
