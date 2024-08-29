import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./ChartPopup.css";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartPopupProps {
  data: number[];
  labels: string[];
  onClose: () => void;
}

const ChartPopup: React.FC<ChartPopupProps> = ({ data, labels, onClose }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Likes",
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value} Likes`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-popup">
      <div className="chart-popup-content">
        <div className="chart-popup-title">
          <h2>Quote Likes</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div style={{ height: "400px", width: "100%" }}>
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartPopup;
