import React from "react";
import ChartComponent from "../../components/Chart/Chart";

const ChartPage: React.FC = () => {
  const data = [12, 19, 3, 5, 2, 3];
  const labels = ["January", "February", "March", "April", "May", "June"];

  return (
    <div>
      <h1>Vote Chart</h1>
      <ChartComponent data={data} labels={labels} />
    </div>
  );
};

export default ChartPage;
