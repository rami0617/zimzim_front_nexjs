import { configureStore } from '@reduxjs/toolkit';

import authReducer from '#stores/auth/slice';
import userReducer from '#stores/user/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
