import React from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

interface ChartProps {
  data: number[];
  labels: string[];
}

const ChartComponent: React.FC<ChartProps> = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Votes",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Votes Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ChartComponent;
