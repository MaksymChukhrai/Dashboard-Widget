// src/components/MicrosoftGraph.jsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import stockData from '../data/stock_mkt_time_data.json'; 


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
// Формирование массива меток для оси X (время)
const labels = stockData.Microsoft.times.map((time) => new Date(time * 1000).toLocaleString());


  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Microsoft Stock Prices',
        data: stockData.Microsoft.prices,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Microsoft Stock Prices',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
  };
  
 const MicrosoftGraph= ()=> {
    return <Line options={options} data={data} />;
  }
  export default MicrosoftGraph;
