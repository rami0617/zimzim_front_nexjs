import { useEffect, useState } from 'react';

import { useGetExerciseListQuery } from '#/api/services/exerciseApi';
import { useGetUserInfoQuery } from '#/api/services/userApi';
import { Exercise } from '#/api/type';

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
        exerciseData?.items.flatMap((ele) =>
          ele.detail.map((order) => ({
            _id: order._id,
            date: ele.date,
            type: order.type,
            force: order.force,
            duration: order.duration,
            isPT: ele.isPT,
          })),
        ),
      );
    }
  }, [exerciseData]);

  return { flattenedData, exerciseData, userInfo };
};

export default useExerciseData;
