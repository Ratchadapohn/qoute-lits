import React from "react";
import ChartComponent from "../../components/Chart/Chart";

// Dummy data for illustration purposes
const ChartPage: React.FC = () => {
  const data = [12, 19, 3, 5, 2, 3]; // Replace with actual vote data
  const labels = ["January", "February", "March", "April", "May", "June"]; // Replace with actual labels

  return (
    <div>
      <h1>Vote Chart</h1>
      <ChartComponent data={data} labels={labels} />
    </div>
  );
};

export default ChartPage;
