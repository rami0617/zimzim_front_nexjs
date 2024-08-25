import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '#/api/axios';
import {
  Exercise,
  GetExercisePayload,
  PostExercisePayload,
} from '#stores/exercise/type';

export const getExercise = createAsyncThunk<Exercise[], GetExercisePayload>(
  'exercise',
  async (payload: GetExercisePayload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/exercise?id=${payload.userId}&startDate=${payload.startDate}&endDate=${payload.endDate}`,
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

export const postExercise = createAsyncThunk(
  'exercise',
  async (payload: PostExercisePayload, thunkAPI) => {
    try {
      await axiosInstance.post('/exercise', payload);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  },
);
