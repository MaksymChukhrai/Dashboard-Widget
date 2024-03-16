// src\components\AppleGraph.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import React from 'react';
import { Chart } from 'react-chartjs-2';
import stockData from '../data/stock_mkt_time_data.json'; 

const AppleGraph = ({ data }) => {
  const { times, prices } = stockData.Apple;
  console.log(times, prices);
  const chartData = {
    labels: times.map((time) => new Date(time * 1000).toLocaleString()),
    datasets: [
      {
        label: 'Apple Stock Prices',
        data: prices,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        type: 'linear',
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div>
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
};

export default AppleGraph;
