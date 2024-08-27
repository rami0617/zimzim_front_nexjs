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
import { Exercise } from '#/stores/exercise/type';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const TotalChart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const exerciseData = useSelector(
    (state: RootState) => state.exercise?.exercise,
  );
  const userId = useSelector((state: RootState) => state.user.user?.id);

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
    labels: exerciseData.map((data: Exercise) =>
      dayjs(data.date).format('YYYY-MM-DD'),
    ),
    datasets: [
      {
        data: exerciseData.map((data: Exercise) => data.duration),
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
    <div className="flex justify-center pt-12">
      <div className="w-4/5 h-80">
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
