// src\components\AppleGraph.jsx
import React, { useState, useEffect } from 'react';
import loadingSpinner from '../img/loading.gif';
import axios from 'axios';
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
// import stockData from '../data/stock_mkt_time_data.json'; 


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
// const apiKey = 'J1R44VP8DQE7RMVO';


const AppleGraph = () => {
  const [isLoading, setIsLoading] = useState(true);
const [isError, setIsError] = useState(false);
  const [data, setData] = useState({});
  const [currentPrice, setCurrentPrice] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo`);
        const stockData = response.data;
  
        // Проверяем структуру данных
        console.log('Stock Data:', stockData);
  
        // Process the data to format labels and get the current price
        const timeSeriesData = stockData['Time Series (Daily)'];
        const labels = Object.keys(timeSeriesData).map(date => date);
        console.log('Labels for X-axis:', labels);
  
        // Объект для хранения последних цен закрытия для каждой даты
        const closingPricesByDate = {};
  
        // Заполняем объект closingPricesByDate
        Object.keys(timeSeriesData).forEach(date => {
          const closePrice = parseFloat(timeSeriesData[date]['4. close']);
          closingPricesByDate[date] = closePrice;
        });
  
        // Формируем отсортированные данные для графика
        const sortedLabels = Object.keys(closingPricesByDate).sort((a, b) => new Date(a) - new Date(b));
      
  // Получаем данные за последние 30 дней
  const last30DaysLabels = sortedLabels.slice(-30);
  const last30DaysClosingPrices = last30DaysLabels.map(date => closingPricesByDate[date]);
     // Выбираем цены закрытия на конец периода (последний день)
     const latestDate = sortedLabels[sortedLabels.length - 1];
     const currentDate = new Date();
const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;
        // Update state with the formatted data
        setData({
          labels: last30DaysLabels,
          datasets: [
            {
              fill: true,
              label: `Date: ${formattedDate}`,
              data: last30DaysClosingPrices,
              borderColor: '#e2a469',
              backgroundColor: 'rgba(254, 249, 243, 0.5)',
            },
          ],
        });

  
     const latestPrice = parseFloat(timeSeriesData[latestDate]['4. close']);
     const openPrice = parseFloat(timeSeriesData[sortedLabels[sortedLabels.length - 2]]['4. close']);
     const change = ((latestPrice - openPrice) / openPrice) * 100;
        setCurrentPrice(latestPrice);
        setPercentageChange(change);
        setIsLoading(false); // Обновляем состояние загрузки
      } catch (error) {
        setIsError(true); // Устанавливаем состояние ошибки
        console.error('Error fetching data:', error);
        alert('Error fetching data...');
      }
    };
    fetchData();
  }, []);
  

  if (isLoading) {
    return <img className='spinner'   src={loadingSpinner} alt="Loading..." />;
  }

if (isError) {
  return <div>Error fetching data...</div>; 

}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'IBM Stock Prices',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date',
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

return (
  <div className='graf-container'>
    <Line options={options} data={data} />
    <ul className='data-figures'>
      <li>Current price<span className='price'>${currentPrice.toFixed(2)}</span></li>
      <li>Percentage change<span className='percent'>{percentageChange.toFixed(2)}%</span></li>

    </ul>
  </div>
);
};

export default AppleGraph;
