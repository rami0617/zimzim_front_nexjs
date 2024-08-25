import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '#/api/axios';
import { Exercise, ExercisePayload } from './type';

export const getExercise = createAsyncThunk<Exercise[], ExercisePayload>(
  'exercise',
  async (payload: ExercisePayload, thunkAPI) => {
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
  async (_, thunkAPI) => {
    try {
      await axiosInstance.post('/exercise', {
        userId: 'user2',
        date: '2024-08-23T08:30:00Z',
        duration: 30,
        type: 1,
        force: 1,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      } else {
        return thunkAPI.rejectWithValue('An unexpected error occurred');
      }
    }
  },
);
