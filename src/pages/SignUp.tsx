import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signUp } from '#/stores/auth/authAction';
import { AppDispatch } from '#/stores/store';

import Button from '#/components/common/button/Button';
import ContentBox from '#/components/common/ContentBox';
import Input from '#/components/common/input/Input';
import CommonLayout from '#/layout/CommonLayout';

import EyeSlashIcon from '#assets/icon/eye-slash-regular.svg?react';
import EyeIcon from '#assets/icon/eye-regular.svg?react';

export type SingnUpFormInput = {
  id: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

const SignUp = () => {
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
      const resultAction = await dispatch(signUp(data));

      if (signUp.fulfilled.match(resultAction)) {
        navigate('/dashboard');
      } else {
        console.log('다시 한번 시도해 주세요');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return (
    <CommonLayout>
      <div className="flex justify-center">
        <ContentBox className="rounded-2xl gap-6">
          <div className="text-center text-xl">
            Let’s get started with ZIMZIM
          </div>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
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
        </ContentBox>
      </div>
    </CommonLayout>
  );
};

export default SignUp;
