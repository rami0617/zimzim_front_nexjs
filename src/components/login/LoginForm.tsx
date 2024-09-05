import React, { useRef, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '#components/common/Button';
import Input from '#/components/common/input/Input';
import ErrorMessage from '#components/common/ErrorMessage';

import { usePostLoginMutation } from '#/api/services/authApi';

import ROUTE from '#/constants/route';
import MESSAGE from '#/constants/message';

const LoginForm = () => {
  const navigate = useNavigate();

  const [postLogin] = usePostLoginMutation();

  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [hasError, setHasError] = useState<boolean>(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (idRef.current?.value === '' || passwordRef.current?.value === '') {
      setHasError(true);
    } else {
      try {
        await postLogin({
          id: idRef.current?.value ?? '',
          password: passwordRef.current?.value ?? '',
        }).unwrap();

        navigate(ROUTE.MAIN_PAGE);
      } catch (error) {
        console.error('Error during login:', error);

        setHasError(true);
      }
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleLogin}>
      <div className="flex flex-col gap-4">
        <Input
          label="ID"
          placeholder={MESSAGE.FORM.REQUIRED('ID를')}
          autoComplete="username"
          defaultValue=""
          name="id"
          ref={idRef}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder={MESSAGE.FORM.REQUIRED('비밀번호를')}
          autoComplete="current-password"
          defaultValue=""
          ref={passwordRef}
        />
        {<ErrorMessage message={hasError ? MESSAGE.FORM.LOGIN.FAILURE : ''} />}
      </div>
      <Button
        type="submit"
        className="bg-primary h-14 w-full rounded-lg text-white font-bold text-xl border-1 border-gray-light"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
