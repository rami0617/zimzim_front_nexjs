import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { SingnUpFormInput } from '#/components/signup/SignupForm';
import { LoginPayload } from '#stores/auth/type';

export const signUp = createAsyncThunk(
  'auth/signup',
  async (userInfo: SingnUpFormInput, thunkAPI) => {
    try {
      const response = await axios.post<SingnUpFormInput>(
        import.meta.env.VITE_SERVER_URL + 'auth/register',
        userInfo,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (userInfo: LoginPayload, thunkAPI) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + 'auth/login',
        userInfo,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  },
);
