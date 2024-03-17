// src/components/MicrosoftGraph.jsx

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
  Legend,
 
);

const MicrosoftGraph= ()=> {
// Формирование массива меток для оси X (время)
const labels = stockData.Microsoft.times.map((time) => new Date(time * 1000).toLocaleString());


  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Microsoft Stock Prices',
        data: stockData.Microsoft.prices,
        borderColor: 'rgb(50, 162, 235)',
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
        time: {
          unit: 'day', // Задаем единицу времени (день, месяц и т.д.)
          tooltipFormat: 'DD MMM YYYY', // Формат подсказки при наведении на точку графика
          displayFormats: {
            day: 'DD MMM', // Формат отображения для единицы времени "день"
          },
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
      const latestPrice = stockData.Microsoft.prices[stockData.Microsoft.prices.length - 1];
      const openPrice = stockData.Microsoft.prices[0];
      setCurrentPrice(latestPrice);
      setPercentageChange(((latestPrice - openPrice) / openPrice) * 100);
    }, []);

    return (
      <div className='graf-container'>
        <Line options={options} data={data} />
        <ul>
          <li>Current price: ${currentPrice}</li>
          <li>Percentage change: {percentageChange.toFixed(2)}%</li>
        </ul>
      </div>
    );

  }


  export default MicrosoftGraph;
