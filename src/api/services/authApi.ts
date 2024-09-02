import { AxiosResponse } from 'axios';

import { SingnUpFormInput } from '#/components/signup/SignupForm';

import { LoginPayload, User } from '#api/type';
import { baseApi } from '#api/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation<User, LoginPayload>({
      query: (loginPayload: LoginPayload) => ({
        url: '/auth/login',
        method: 'POST',
        data: loginPayload,
      }),
    }),
    postSignup: build.mutation<any, SingnUpFormInput>({
      query: (userInfo: SingnUpFormInput) => ({
        url: '/auth/register',
        method: 'POST',
        data: userInfo,
      }),
    }),
  }),
});

export const { usePostLoginMutation, usePostSignupMutation } = authApi;
