import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '#components/common/Button';
import Input from '#components/common/Input';

import { AppDispatch } from '#stores/store';

import EyeSlashIcon from '#assets/icon/eye-slash-regular.svg?react';
import EyeIcon from '#assets/icon/eye-regular.svg?react';
import { usePostSignupMutation } from '#/api/services/authApi';

export type SingnUpFormInput = {
  id: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

const SignupForm = () => {
  const [postSignup, { isSuccess }] = usePostSignupMutation();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const schema = yup
    .object()
    .shape({
      id: yup
        .string()
        .matches(/^[A-Za-z0-9]+$/i, '유효한 아이디를 입력해주세요')
        .required('아이디를 입력해주세요'),
      nickname: yup
        .string()
        .max(10, '10글자 이하여야 합니다.')
        .matches(/^[A-Za-z0-9]+$/i, '유효한 닉네임을 입력해주세요')
        .required('닉네임을 입력해주세요'),
      password: yup
        .string()
        .min(8, '8글자 이상이어야 합니다.')
        .required('비밀번호를 입력해주세요'),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다')
        .required('비밀번호 확인을 입력해주세요'),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<SingnUpFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'password') {
        trigger('passwordConfirm');
      }
      trigger(name);
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const onSubmit = async (data: SingnUpFormInput) => {
    try {
      await postSignup(data);

      if (isSuccess) {
        navigate('/login');
      } else {
        console.log('다시 한번 시도해 주세요');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return (
    <form className="flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <Input
          label="ID"
          placeholder="Enter your ID"
          errorMessage={errors.id?.message}
          {...register('id')}
        />
        <Input
          label="Nickname"
          placeholder="Enter your Nickname"
          errorMessage={errors.nickname?.message}
          {...register('nickname')}
        />
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your Password"
          errorMessage={errors.password?.message}
          {...register('password')}
        >
          <div
            className="absolute inset-y-4 right-4"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeIcon width={16} />
            ) : (
              <EyeSlashIcon width={16} />
            )}
          </div>
        </Input>
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Enter your Password"
          errorMessage={errors.passwordConfirm?.message}
          {...register('passwordConfirm')}
        >
          <div
            className="absolute inset-y-4 right-4"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? (
              <EyeIcon width={16} className="text-gray-dark" />
            ) : (
              <EyeSlashIcon width={16} />
            )}
          </div>
        </Input>
      </div>
      <Button
        type="submit"
        className="bg-primary h-12 w-full rounded-lg text-white font-bold text-xl border-1 border-gray-light"
      >
        Sign Up
      </Button>
    </form>
  );
};
export default SignupForm;
