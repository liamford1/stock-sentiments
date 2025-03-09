'use client';

import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { StockSentiment } from '@/lib/types';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RadarChartProps {
  data: StockSentiment[];
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available for the radar chart.</p>;
  }

  const total = data.length;

  // Convert the string values to numbers.
  // If conversion fails, it defaults to 0.
  const avgHour = data.reduce((sum, stock) => sum + (parseFloat(stock.hour) || 0), 0) / total;
  const avgDay = data.reduce((sum, stock) => sum + (parseFloat(stock.day) || 0), 0) / total;
  const avg4Hour = data.reduce((sum, stock) => sum + (parseFloat(stock['4_hour']) || 0), 0) / total;
  const avg12Hour = data.reduce((sum, stock) => sum + (parseFloat(stock['12_hour']) || 0), 0) / total;

  const chartData = {
    labels: ['Hour', 'Day', '4 Hour', '12 Hour'],
    datasets: [
      {
        label: 'Average Sentiment Score',
        data: [avgHour, avgDay, avg4Hour, avg12Hour],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
