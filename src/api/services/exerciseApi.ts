import { baseApi } from '#api/baseApi';

import {
  DeleteExerciseDetailPayload,
  Exercise,
  ExerciseList,
  GetExerciseListPayload,
  GetExercisePayload,
  PostExercisePayload,
  UpdateExercisePayload,
} from '#/api/types';

import API_ENDPOINT from '#/constants/api';

export const exerciseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getExercise: build.query<Exercise[], GetExercisePayload>({
      query: (payload: GetExercisePayload) => ({
        url: API_ENDPOINT.EXERCISE.EXERCISE,
        method: 'GET',
        params: {
          id: payload.userId,
          startDate: payload.startDate,
          endDate: payload.endDate,
        },
      }),
      providesTags: (result) =>
        result
          ? result.map((exercise) => ({ type: 'Exercise', id: exercise._id }))
          : [{ type: 'Exercise', id: 'Exercise' }],
    }),
    getExerciseList: build.query<ExerciseList, GetExerciseListPayload>({
      query: (payload: GetExerciseListPayload) => ({
        url: API_ENDPOINT.EXERCISE.LIST,
        method: 'GET',
        params: {
          id: payload.userId,
          page: payload.page,
          limit: payload.limit,
        },
      }),
      providesTags: (result) =>
        result
          ? result.items.map((exercise: Exercise) => ({
              type: 'Exercise',
              id: exercise._id,
            }))
          : [{ type: 'Exercise', id: 'LIST' }],
    }),
    getExerciseDetail: build.query({
      query: (id: string) => ({
        url: API_ENDPOINT.EXERCISE.DETAIL(id),
        method: 'GET',
      }),
      providesTags: () => [{ type: 'Exercise', id: 'DETAIL' }],
    }),
    postExercise: build.mutation<void, PostExercisePayload>({
      query: (payload: PostExercisePayload) => ({
        url: API_ENDPOINT.EXERCISE.EXERCISE,
        method: 'POST',
        data: payload,
      }),
    }),
    updateExercise: build.mutation<void, UpdateExercisePayload>({
      query: ({ id, payload }: UpdateExercisePayload) => ({
        url: API_ENDPOINT.EXERCISE.DETAIL(id),
        method: 'POST',
        data: payload,
      }),
    }),
    deleteExerciseDetail: build.mutation<void, DeleteExerciseDetailPayload[]>({
      query: (payload: DeleteExerciseDetailPayload[]) => ({
        url: API_ENDPOINT.EXERCISE.DETAILS,
        method: 'POST',
        data: {
          exerciseDetails: payload,
        },
      }),
    }),
  }),
});

export const {
  useGetExerciseQuery,
  useGetExerciseListQuery,
  useGetExerciseDetailQuery,
  usePostExerciseMutation,
  useUpdateExerciseMutation,
  useDeleteExerciseDetailMutation,
} = exerciseApi;
