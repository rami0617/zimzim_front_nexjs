import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '#/api/axios';

export const getUserInfo = createAsyncThunk(
  'user/info',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/user/info');

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
