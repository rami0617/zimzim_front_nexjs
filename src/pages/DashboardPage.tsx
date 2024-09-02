import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import TotalChart from '#components/dashboard/TotalChart';
import ExerciseChart from '#/components/dashboard/ExerciseChart';
import WaterChart from '#/components/dashboard/WaterChart';
import { useGetUserInfoQuery } from '#/api/services/userApi';
import { useGetExerciseQuery } from '#/api/services/exerciseApi';

const DashboardPage = () => {
  const [totalDuration, setTotalDuration] = useState(0);

  const { data: userState, isLoading: isUserInfoLoading } =
    useGetUserInfoQuery();

  const { data: exerciseState, isLoading: isExerciseLoading } =
    useGetExerciseQuery(
      {
        userId: userState?.id ?? '',
        startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
      },
      {
        skip: !userState?.id,
      },
    );

  useEffect(() => {
    if (exerciseState?.length) {
      setTotalDuration(
        exerciseState.reduce(
          (acc, cur) => acc + parseFloat(cur.totalDuration),
          0,
        ),
      );
    }
  }, [exerciseState]);

  if (isUserInfoLoading || isExerciseLoading) {
    return <div>loading~</div>;
  }

  return (
    <div className="flex flex-col gap-4 px-10">
      <p className="text-lg pt-2">
        ✅ {userState?.nickname}님, 이번주 {exerciseState?.length}회{' '}
        {totalDuration}분 운동했어요
      </p>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row justify-between items-cetner w-full gap-6">
          <TotalChart />
          <ExerciseChart />
        </div>
        <WaterChart />
      </div>
    </div>
  );
};

export default DashboardPage;
