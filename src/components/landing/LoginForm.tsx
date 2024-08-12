import React from 'react';

import Button from '#components/common/button/Button';
import Input from '#components/common/input/Input';

import useInput from '#/hooks/useInput';

import MailIcon from '#assets/icon/mail_outline.svg?react';
import LockIcon from '#assets/icon/lock.svg?react';

const LoginForm = () => {
  const { value: id, onChange: idOnchange } = useInput<string>('');
  const { value: password, onChange: passwordOnchange } = useInput<string>('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (id === '') {
      alert('아이디를 입력해주세요');
    } else if (password === '') {
      alert('패스워드를 입력해주세요');
    } else {
      //server reqeust 요청
      alert('submit!!');
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleLogin}>
      <Input
        onChange={idOnchange}
        placeholder="Enter your ID"
        autoComplete="username"
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MailIcon className="text-gray-dark" />
        </div>
      </Input>

      <Input
        type="password"
        onChange={passwordOnchange}
        placeholder="Enter your password"
        autoComplete="current-password"
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <LockIcon className="text-gray-dark" />
        </div>
      </Input>

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
