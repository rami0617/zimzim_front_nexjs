import { useState, ChangeEvent } from 'react';

const useInput = <T,>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const handleValue = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setValue(event.target.value as unknown as T);
  };

  return {
    initialValue,
    value,
    onChange: handleValue,
  };
};

export default useInput;
