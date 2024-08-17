import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { signUp, login } from './authAction';
import { SignupState } from './type';
import { SingnUpFormInput } from '#/pages/SignUp';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  token: null,
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
        console.log('login succeed', action.payload);
        state.token = action.payload.token;
        console.log(state.token, 'user~');
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
