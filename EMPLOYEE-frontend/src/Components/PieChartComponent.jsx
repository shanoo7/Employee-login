import React from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';

const PieChartComponent = ({ data }) => {
<<<<<<< HEAD
  return (
    <div className="tw-p-20">
      <h1><b>Pie Chart</b></h1>
=======
  
  return (
    <div>
      <h2>Pie Chart</h2>
>>>>>>> 07f2507e2057925d04f960dafe13df0d71731a08
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
