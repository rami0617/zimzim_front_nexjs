import React, { useRef } from 'react';

import Button from '#components/common/button/Button';
import Input from '#components/common/input/Input';

import useInput from '#/hooks/useInput';

const LoginForm = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (idRef.current?.value === '') {
      alert('아이디를 입력해주세요');
    } else if (passwordRef.current?.value === '') {
      alert('패스워드를 입력해주세요');
    } else {
      //server reqeust 요청
      alert('submit!!');
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleLogin}>
      <Input
        label="ID"
        placeholder="Enter your ID"
        autoComplete="username"
        ref={idRef}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        autoComplete="current-password"
        ref={passwordRef}
      />

      <Button
        type="submit"
        className="bg-primary h-14 w-full rounded-lg text-white font-bold text-2xl border-1 border-gray-light"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
