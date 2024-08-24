import { User } from '#stores/auth/type';

export interface UserState {
  user: User | null;
  exercise: Exercise[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface ExercisePayload {
  userId: string;
  startDate: string;
  endDate: string;
}

export interface Exercise {
  _id: string;
  date: string;
  duration: number;
  type: EXERCISE_TYPE;
  force: EXCERCISE_FORCE_TYPE;
}

const EXERCISE_TYPE = {
  WEIGHT: 'weight',
  CARDIO: 'cardio',
} as const;
type EXERCISE_TYPE = (typeof EXERCISE_TYPE)[keyof typeof EXERCISE_TYPE];

const EXCERCISE_FORCE_TYPE = {
  EASY: 'easy',
  HARD: 'hard',
} as const;
type EXCERCISE_FORCE_TYPE =
  (typeof EXCERCISE_FORCE_TYPE)[keyof typeof EXCERCISE_FORCE_TYPE];
