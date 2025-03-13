import React, { useState, useEffect } from "react";
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
} from "chart.js";
import { Line } from "react-chartjs-2";
import stockData from "../data/stock_mkt_time_data.json";

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

const NvidiaGraph = () => {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [percentageColor, setPercentageColor] = useState("red");

  useEffect(() => {
    const latestPrice =
      stockData.Nvidia.prices[stockData.Nvidia.prices.length - 1];
      const openPrice = stockData.Nvidia.prices[stockData.Nvidia.prices.length - 2];

  
    
    const change = ((latestPrice - openPrice) / openPrice) * 100;
    setCurrentPrice(latestPrice);
    setPercentageChange(change);
  
    // Set color based on the change value
    const colorClass = change > 0 ? "green" : "red";
    setPercentageColor(colorClass);
  }, []);

  const currentDate = new Date();
  const formattedDate = `${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")}.${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${currentDate.getFullYear()}`;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Nvidia Stock Prices",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
      },
    },
  };

  const data = {
    labels: stockData.Apple.times.map((time) => {
      const date = new Date(time * 1000);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }),
    datasets: [
      {
        fill: true,
        label: `Date: ${formattedDate}`,
        data: stockData.Nvidia.prices,
        borderColor: "#786e79",
        backgroundColor: "rgba(254, 249, 243, 0.5)",
      },
    ],
  };

  return (
    <div className="graf-container nvidia">
      <Line options={options} data={data} />
      <ul className="data-figures">
        <li>
          Current price<span className="price">${currentPrice.toFixed(2)}</span>
        </li>
        <li>
          Percentage change{" "}
          <span className={`percent ${percentageColor}`}>
            {percentageChange.toFixed(2)}%
          </span>
        </li>
      </ul>
    </div>
  );
};

export default NvidiaGraph;
