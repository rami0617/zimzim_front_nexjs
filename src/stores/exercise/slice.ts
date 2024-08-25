import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getExercise } from './action';
import { Exercise, ExerciseState } from './type';

const initialState: ExerciseState = {
  status: 'idle',
  error: null,
  exercise: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getExercise.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getExercise.fulfilled,
        (state, action: PayloadAction<Exercise[]>) => {
          state.status = 'succeeded';

          state.exercise = action.payload;
        },
      )
      .addCase(getExercise.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default userSlice.reducer;
