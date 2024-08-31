import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '#/stores/store';

import WeightIcon from '#assets/icon/chart/weight.png';
import CardioIcon from '#assets/icon/chart/cardio.png';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExerciseChart = () => {
  const navigate = useNavigate();

  const exerciseData = useSelector(
    (state: RootState) => state.exercise?.exercise,
  );
  let cardio = 0;
  let weight = 0;
  exerciseData.forEach((ele) =>
    ele.detail.forEach((detail) => {
      if (detail.type === 'cardio') {
        cardio += parseFloat(detail.duration);
      } else {
        weight += parseFloat(detail.duration);
      }
    }),
  );
  const data = {
    labels: ['weight', 'cardio'],
    datasets: [
      {
        data: [weight, cardio],
        fill: false,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
        tension: 0.1,
        image: [WeightIcon, CardioIcon],
      },
    ],
  };

  const images = [WeightIcon, CardioIcon].map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  const customPlugin = {
    id: 'customPlugin',
    afterDatasetDraw(chart) {
      const { ctx } = chart;
      const width = 30;
      ctx.save();

      chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
        const x = datapoint.tooltipPosition().x;
        const y = datapoint.tooltipPosition().y;

        const image = images[index];
        ctx.clearRect(x - width / 2, y - width / 2, width, width);
        ctx.drawImage(image, x - width / 2, y - width / 2, width, width);
      });

      ctx.restore();
    },
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        // position: 'bottom',
      },
    },
  };

  return (
    <div
      className="w-1/3 bg-white rounded-lg border-1 pb-6 pt-2 px-4 flex flex-col justify-between cursor-pointer"
      onClick={() => navigate('/exercise')}
    >
      <p className="text-sm font-bold">Weight/Cardio</p>
      <div className="w-full flex justify-center">
        <Doughnut data={data} options={options} plugins={[customPlugin]} />
      </div>
    </div>
  );
};

export default ExerciseChart;
