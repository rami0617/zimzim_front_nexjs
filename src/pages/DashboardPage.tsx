import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '#/stores/store';

import TotalChart from '#components/dashboard/TotalChart';
import ExerciseChart from '#/components/dashboard/ExerciseChart';
import WaterChart from '#/components/dashboard/WaterChart';

const DashboardPage = () => {
  const userState = useSelector((state: RootState) => state.user);
  const exerciseState = useSelector(
    (state: RootState) => state.exercise.exercise,
  );
  const totalDuration = exerciseState.reduce(
    (acc, cur) => acc + parseFloat(cur.totalDuration),
    0,
  );

  return (
    <div className="flex flex-col gap-4 px-10">
      <p className="text-lg pt-2">
        ✅ {userState.user?.nickname}님, 이번주 {exerciseState.length}회{' '}
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
