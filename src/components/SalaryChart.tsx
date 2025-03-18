import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SalaryChartProps {
  labels: string[];
  data: number[];
}

const SalaryChart: React.FC<SalaryChartProps> = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Evolución del Salario',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evolución del Salario de los Profesores',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default SalaryChart;
