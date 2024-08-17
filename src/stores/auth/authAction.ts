import axios from 'axios';

import axiosInstance from '#/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SingnUpFormInput } from '#/pages/SignUp';

export const signUp = createAsyncThunk(
  'auth/signup',
  async (userInfo: SingnUpFormInput, thunkAPI) => {
    try {
      const response = await axiosInstance.post('auth/register', userInfo);

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
  async (
    userInfo: {
      id: string;
      password: string;
    },
    thunkAPI,
  ) => {
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
