import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUserInfo } from '#stores/user/action';
import { UserState } from '#stores/user/type';
import { User } from '#stores/auth/type';

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
