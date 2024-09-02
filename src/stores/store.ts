import { configureStore } from '@reduxjs/toolkit';

import authReducer from '#stores/auth/slice';
import userReducer from '#stores/user/slice';
import exerciseReducer from '#stores/exercise/slice';
import { baseApi } from '#/api/baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    user: userReducer,
    exercise: exerciseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
