import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { signUp, login } from '#stores/auth/action';
import { SignupState } from '#stores/auth/type';
import { SingnUpFormInput } from '#/components/signup/SignupForm';

const initialState: SignupState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        signUp.fulfilled,
        (state, action: PayloadAction<SingnUpFormInput>) => {
          state.status = 'succeeded';
          state.user = action.payload;
        },
      )
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
