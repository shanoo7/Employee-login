import React from 'react';
import BarGraphComponent from './BarGraphComponent';
import DonutChartComponent from './DonutChartComponent';

const Reports = () => {
  return (
    <div>
      <h2>Reports</h2>
      <div>
        <h3>Project Time Report</h3>
        <BarGraphComponent />
      </div>
      <div>
        <h3>Tag Usage Report</h3>
        <DonutChartComponent />
      </div>
    </div>
  );
};

export default Reports;

