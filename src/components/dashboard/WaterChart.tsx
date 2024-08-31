import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const WaterChart = () => {
  const navigate = useNavigate();

  const data = {
    labels: ['January'],
    datasets: [
      {
        label: 'Sales 2024 (M)',
        data: [100],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      //   title: {
      //     display: true,
      //     align: 'start',
      //     position: 'top',
      //     text: 'total water volume',
      //     color: 'black',
      //     padding: {
      //       top: 8,
      //       //   right: 16,
      //       bottom: 8,
      //     },
      //   },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        display: false,
        max: 100,
      },
    },
  };

  return (
    <div
      className="bg-white rounded-lg border-1 h-32 pb-6 pt-2 px-4 w-full cursor-pointer"
      onClick={() => navigate('/water')}
    >
      <p className="text-sm font-bold">Water Total Volume</p>
      <Bar data={data} options={options} />
    </div>
  );
};

export default WaterChart;
