import { User } from '#/stores/auth/type';

import { baseApi } from '#api/baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<User, void>({
      query: () => ({
        url: '/user/info',
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'User' }],
    }),
  }),
});

export const { useGetUserInfoQuery } = userApi;
