'use client';

import { useGasStore } from '../store/gasStore';
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
import { Line } from 'react-chartjs-2';
import { useMemo } from 'react';

// Chart.js component registration (client-side only)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CandlestickChart() {
  const { chains, selectedChain } = useGasStore();
  const currentChain = chains[selectedChain];

  // Use last 10 entries from history, fallback to empty array
  const history = useMemo(() => currentChain?.history?.slice(-10) || [], [currentChain?.history]);

  // Convert to Gwei safely
  const safeDataPoints = history.map((val: any) => {
    if (typeof val === 'object' && val?.value !== undefined) {
      return Number(val.value) / 1e9;
    }
    return Number(val) / 1e9;
  });

  // Chart.js dataset
  const data = {
    labels: safeDataPoints.map((_, idx) => `T-${safeDataPoints.length - idx}`),
    datasets: [
      {
        label: 'Gas Price (Gwei)',
        data: safeDataPoints,
        fill: true,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#2563eb',
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Gas Price History (Recent)',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Gwei',
        },
      },
    },
  };

  // Fallback if no data available
  if (!safeDataPoints.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Gas Price History</h2>
          <div className="text-sm text-gray-600">
            {selectedChain.charAt(0).toUpperCase() + selectedChain.slice(1)} Network
          </div>
        </div>
        <div className="flex items-center justify-center text-gray-500 h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          No history data available to display the chart.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Gas Price History</h2>
        <div className="text-sm text-gray-600">
          {selectedChain.charAt(0).toUpperCase() + selectedChain.slice(1)} Network
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <Line data={data} options={options} />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="text-green-600 font-medium">24h Low</div>
          <div className="text-lg">{(Number(currentChain.slow) / 1e9).toFixed(1)} Gwei</div>
        </div>
        <div className="text-center">
          <div className="text-gray-600 font-medium">24h Avg</div>
          <div className="text-lg">{(Number(currentChain.standard) / 1e9).toFixed(1)} Gwei</div>
        </div>
        <div className="text-center">
          <div className="text-red-600 font-medium">24h High</div>
          <div className="text-lg">{(Number(currentChain.fast) / 1e9).toFixed(1)} Gwei</div>
        </div>
      </div>
    </div>
  );
}
