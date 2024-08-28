export interface ExerciseState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  exercise: Exercise[];
}

export interface GetExercisePayload {
  userId: string;
  startDate: string;
  endDate: string;
}

export interface PostExercisePayload {
  userId: string;
  date: string;
  duration: number;
  type: EXERCISE_TYPE;
  force: EXERCISE_FORCE_TYPE;
}

export interface Exercise {
  _id: string;
  date: string;
  duration: number;
  type: EXERCISE_TYPE;
  force: EXERCISE_FORCE_TYPE;
}

export const EXERCISE_TYPE = {
  WEIGHT: 'weight',
  CARDIO: 'cardio',
} as const;
export type EXERCISE_TYPE = (typeof EXERCISE_TYPE)[keyof typeof EXERCISE_TYPE];

export const EXERCISE_FORCE_TYPE = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;
export type EXERCISE_FORCE_TYPE =
  (typeof EXERCISE_FORCE_TYPE)[keyof typeof EXERCISE_FORCE_TYPE];
