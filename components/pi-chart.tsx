'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { StockSentiment } from '@/lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PiChartProps {
  data: StockSentiment[];
}

const PiChart: React.FC<PiChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available for the pie chart.</p>;
  }

  // Aggregate the sentiment counts
  const sentimentCounts = data.reduce(
    (acc, stock) => {
      if (stock.Sentiment === 'positive') {
        acc.positive += 1;
      } else if (stock.Sentiment === 'negative') {
        acc.negative += 1;
      }
      return acc;
    },
    { positive: 0, negative: 0 }
  );

  const labels = ['Positive', 'Negative'];
  const values = [sentimentCounts.positive, sentimentCounts.negative];

  // Define colors for the slices
  const backgroundColors = [
    'rgba(75, 192, 192, 0.2)', // positive
    'rgba(255, 99, 132, 0.2)', // negative
  ];
  const borderColors = [
    'rgba(75, 192, 192, 1)',
    'rgba(255, 99, 132, 1)',
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  // Configure options to disable maintaining aspect ratio
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Wrap the Pie chart in a container with fixed dimensions
  return (
    <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PiChart;
