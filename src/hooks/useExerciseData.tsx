import { useEffect, useState } from 'react';

import { useGetExerciseListQuery } from '#/api/services/exerciseApi';
import { useGetUserInfoQuery } from '#/api/services/userApi';
import { Exercise } from '#/api/types';

export type FlattenedExercise = Pick<Exercise, 'date' | 'isPT'> &
  Pick<Exercise['detail'][number], 'type' | 'duration' | 'force' | '_id'>;

const useExerciseData = (page: number) => {
  const { data: userInfo } = useGetUserInfoQuery();
  const { data: exerciseData, refetch } = useGetExerciseListQuery(
    {
      userId: userInfo?.id ?? '',
      page,
      limit: 10,
    },
    { skip: !userInfo?.id },
  );
  const [flattenedData, setFlattenData] = useState<FlattenedExercise[] | []>(
    [],
  );

  useEffect(() => {
    if (userInfo) {
      refetch();
    }
  }, [page, refetch, userInfo]);

  useEffect(() => {
    if (exerciseData?.items) {
      setFlattenData(
        exerciseData?.items.flatMap((exercise) =>
          exercise.detail.map((element) => ({
            _id: element._id,
            date: exercise.date,
            type: element.type,
            force: element.force,
            duration: element.duration,
            isPT: exercise.isPT,
          })),
        ),
      );
    }
  }, [exerciseData]);

  return { flattenedData, exerciseData, userInfo };
};

export default useExerciseData;
