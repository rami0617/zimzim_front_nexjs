import React, { useRef, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '#components/common/Button';
import Input from '#components/common/Input';
import ErrorMessage from '#components/common/ErrorMessage';

import { AppDispatch } from '#stores/store';
import { setUser } from '#/stores/user/slice';

import { usePostLoginMutation } from '#/api/authApi';

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
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
        const result = await postLogin({
          id: idRef.current?.value ?? '',
          password: passwordRef.current?.value ?? '',
        }).unwrap();

        dispatch(setUser(result));
        navigate('/');
      } catch (error) {
        console.error('Error during login:', error);

        setHasError(true);
      }
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleLogin}>
      <div className="flex flex-col gap-6">
        <Input
          label="ID"
          placeholder="Enter your ID"
          autoComplete="username"
          defaultValue=""
          name="id"
          ref={idRef}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          defaultValue=""
          ref={passwordRef}
        />
        {hasError && (
          <ErrorMessage message="아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요." />
        )}
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
