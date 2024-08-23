import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { getExercise } from '#/stores/user/actions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const TotalChart = () => {
  const dispatch = useDispatch();
  const exerciseData = useSelector((state) => state.user.exercise);

  useEffect(() => {
    dispatch(getExercise());
  }, [dispatch]);

  const data = {
    labels: exerciseData.map((data) => {
      return dayjs(data.date).format('YYYY-MM-DD');
    }),
    datasets: [
      {
        data: exerciseData.map((data) => {
          return data.duration;
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
    <div className="flex justify-center pt-12">
      <div className="w-4/5 h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TotalChart;
