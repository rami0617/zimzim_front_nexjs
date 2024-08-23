import React from 'react';

import UserCommonLayout from '#/layout/UserCommonLayout';
import TotalChart from '#/components/dashboard/TotalChart';

const Dashboard = () => {
  return (
    <UserCommonLayout title="DASHBOARD">
      <TotalChart />
    </UserCommonLayout>
  );
};

export default Dashboard;
