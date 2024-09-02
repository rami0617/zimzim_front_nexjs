import { LoginPayload, User } from '#/stores/auth/type';

import { baseApi } from '#api/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation<User, LoginPayload>({
      query: (userInfo: LoginPayload) => ({
        url: '/auth/login',
        method: 'POST',
        data: userInfo,
      }),
    }),
  }),
});

export const { usePostLoginMutation } = authApi;
