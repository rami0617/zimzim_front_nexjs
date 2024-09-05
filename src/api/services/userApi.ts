import { baseApi } from '#api/baseApi';

import { User } from '#/api/types';

import API_ENDPOINT from '#/constants/api';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<User, void>({
      query: () => ({
        url: API_ENDPOINT.USER.INFO,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'User', id: 'User' }],
    }),
  }),
});

export const { useGetUserInfoQuery } = userApi;
