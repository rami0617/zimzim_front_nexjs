import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import dayjs from 'dayjs';

import { AppDispatch, RootState } from '#/stores/store';
import { getExercise } from '#/stores/exercise/action';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const TotalChart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const exerciseData = useSelector(
    (state: RootState) => state.exercise?.exercise,
  );
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const dateRagne = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(6, 'day').add(i, 'day').format('YYYY-MM-DD'),
  );

  useEffect(() => {
    if (userId) {
      dispatch(
        getExercise({
          userId: userId,
          startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
          endDate: dayjs().format('YYYY-MM-DD'),
        }),
      );
    }
  }, [dispatch, userId]);

  const data = {
    labels: dateRagne,
    datasets: [
      {
        data: dateRagne.map((date) => {
          const filter = exerciseData?.filter(
            (exercise) => dayjs(exercise.date).format('YYYY-MM-DD') === date,
          );

          if (filter?.length > 0) {
            return filter[0].totalDuration;
          } else {
            return '0';
          }
        }),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 120,
      },
    },
  };

  return (
    <div className="flex justify-center pt-10 ">
      <div className="w-4/5 h-80 bg-white p-4 rounded-lg border-1 border-gray-light">
        <Line
          data={data}
          options={options}
          onClick={() => {
            navigate('/exercise');
          }}
        />
      </div>
    </div>
  );
};

export default TotalChart;
