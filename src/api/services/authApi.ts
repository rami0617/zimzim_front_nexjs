import { SignUpFormInput } from '#/components/signup/SignupForm';

import { baseApi } from '#api/baseApi';
import { LoginPayload, User } from '#/api/types';

import API_ENDPOINT from '#/constants/api';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation<User, LoginPayload>({
      query: (loginPayload: LoginPayload) => ({
        url: API_ENDPOINT.AUTH.LOGIN,
        method: 'POST',
        data: loginPayload,
      }),
    }),
    postSignup: build.mutation<void, SignUpFormInput>({
      query: (userInfo: SignUpFormInput) => ({
        url: API_ENDPOINT.AUTH.SIGN_UP,
        method: 'POST',
        data: userInfo,
      }),
    }),
    postLogout: build.mutation<void, void>({
      query: () => ({
        url: API_ENDPOINT.AUTH.LOGOUT,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  usePostLoginMutation,
  usePostSignupMutation,
  usePostLogoutMutation,
} = authApi;
