// src\components\AppleGraph.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function AppleGraph() {
  const [data, setData] = useState({ times: [], prices: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('../../public/data/stock_mkt_time_data.json');
        setData(response.data.Apple); // Assuming "Apple" is the key for Apple's data in the JSON
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.times.map((time) => new Date(time * 1000).toLocaleString()), // Assuming times are Unix timestamps
    datasets: [
      {
        label: 'Apple Stock Prices',
        data: data.prices,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div>
      <h2>Apple Stock Prices</h2>
      <Line data={chartData} />
    </div>
  );
}

export default AppleGraph;