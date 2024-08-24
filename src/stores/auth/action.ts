import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { SingnUpFormInput } from '#/components/signup/SignupForm';
import { LoginPayload, User } from '#stores/auth/type';
import axiosInstance from '#/api/axios';

export const signUp = createAsyncThunk(
  'auth/signup',
  async (userInfo: SingnUpFormInput, thunkAPI) => {
    try {
      const response = await axiosInstance.post<SingnUpFormInput>(
        'auth/register',
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

export const login = createAsyncThunk<User, LoginPayload>(
  'auth/login',
  async (userInfo: LoginPayload, thunkAPI) => {
    try {
      const response = await axiosInstance.post('auth/login', userInfo);

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
