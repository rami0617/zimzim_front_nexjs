import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import dayjs from 'dayjs';

import { useGetUserInfoQuery } from '#/api/services/userApi';
import { useGetExerciseQuery } from '#/api/services/exerciseApi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const TotalChart = () => {
  const navigate = useNavigate();

  const { data: userInfo } = useGetUserInfoQuery();

  const dateRagne = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(6, 'day').add(i, 'day').format('YYYY-MM-DD'),
  );

  const { data: exerciseData, isLoading: isExerciseLoading } =
    useGetExerciseQuery(
      {
        userId: userInfo?.id ?? '',
        startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
      },
      { skip: !userInfo },
    );

  if (isExerciseLoading) {
    return <div>loading~</div>;
  }

  const data = {
    labels: dateRagne,
    datasets: [
      {
        data: dateRagne.map((date) => {
          const filter = exerciseData?.filter(
            (exercise) => dayjs(exercise.date).format('YYYY-MM-DD') === date,
          );

          if (filter && filter?.length > 0) {
            return filter[0].totalDuration;
          } else {
            return '0';
          }
        }),
        fill: false,
        borderColor: '#98abf9',
        pointStyle: 'line',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 120,
      },
    },
  };

  return (
    <div className="w-2/3 bg-white rounded-lg border-1 border-gray-light py-2 px-4 cursor-pointer h-full">
      <p className="text-sm font-bold pb-2">Total workout volume</p>

      <Line
        data={data}
        options={options}
        onClick={() => {
          navigate('/exercise');
        }}
      />
    </div>
  );
};

export default TotalChart;
