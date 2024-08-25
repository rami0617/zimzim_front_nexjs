import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getExercise } from '#stores/exercise/action';
import { Exercise, ExerciseState } from '#stores/exercise/type';

const initialState: ExerciseState = {
  status: 'idle',
  error: null,
  exercise: [],
};

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: { resetExercise: () => initialState },
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

export const { resetExercise } = exerciseSlice.actions;

export default exerciseSlice.reducer;
