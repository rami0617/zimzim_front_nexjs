import React from 'react';

import TotalChart from '#components/dashboard/TotalChart';
import { useSelector } from 'react-redux';
import { RootState } from '#/stores/store';
import { userInfo } from 'os';

const DashboardPage = () => {
  const userState = useSelector((state: RootState) => state.user);
  const exerciseState = useSelector(
    (state: RootState) => state.exercise.exercise,
  );
  const totalDuration = exerciseState.reduce(
    (acc, cur) => acc + parseFloat(cur.totalDuration),
    0,
  );

  // const userInfo=
  return (
    <div>
      <p className="text-xl pt-4 pl-12">
        ✅ {userState.user?.nickname}님, 이번주 {exerciseState.length}회{' '}
        {totalDuration}분 운동하셨어요
      </p>
      <TotalChart />
    </div>
  );
};

export default DashboardPage;
