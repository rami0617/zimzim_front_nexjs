import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '#api/axiosBaseQuery';

export const baseApi = createApi({
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Auth', 'User', 'Exercise'],
  endpoints: () => ({}),
});
