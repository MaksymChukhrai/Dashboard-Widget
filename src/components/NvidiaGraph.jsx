//src\components\NvidiaGraph.jsx

import React, { useState, useEffect } from 'react';
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

const NvidiaGraph= ()=> {
// Формирование массива меток для оси X (время)
const labels = stockData.Apple.times.map((time) => {
  const date = new Date(time * 1000);
  const hours = date.getHours().toString().padStart(2, '0'); // Добавляем ведущий ноль, если число меньше 10
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Добавляем ведущий ноль, если число минут меньше 10
  return `${hours}:${minutes}`;
});

const currentDate = new Date();
const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: `Date: ${formattedDate}`,
        data: stockData.Nvidia.prices,
        borderColor: '#83988f',
        backgroundColor: 'rgba(254, 249, 243, 0.5)',
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
        text: `Nvidia Stock Prices`,
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
      // Состояния для текущей цены и процентного изменения
      const [currentPrice, setCurrentPrice] = useState(0);
      const [percentageChange, setPercentageChange] = useState(0);
    
      useEffect(() => {
        // Вычисление текущей цены и процентного изменения
        const latestPrice = stockData.Nvidia.prices[stockData.Nvidia.prices.length - 1];
        const openPrice = stockData.Nvidia.prices[0];
        setCurrentPrice(latestPrice);
        setPercentageChange(((latestPrice - openPrice) / openPrice) * 100);
      }, []);

      return (
        <div className='graf-container nvidia'>
          <Line options={options} data={data} />
          <ul className='data-figures'>
            <li>Current price <span className='price'>${currentPrice}</span> </li>
            <li>Percentage change <span className='percent'>{percentageChange.toFixed(2)}%</span></li>
          </ul>
        </div>
      );
  }
  export default NvidiaGraph;