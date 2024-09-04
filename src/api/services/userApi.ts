import { baseApi } from '#api/baseApi';
import { User } from '#api/type';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<User, void>({
      query: () => ({
        url: '/user/info',
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'User', id: 'User' }],
    }),
  }),
});

export const { useGetUserInfoQuery } = userApi;
