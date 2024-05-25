import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const DonutChartComponent = () => {
  const [tagData, setTagData] = useState([]);

  useEffect(() => {
    axios.get('https://employeelogin.vercel.app/auth/tag_list')
      .then(response => {
        setTagData(response.data.tags);
      })
      .catch(error => {
        console.error('There was an error fetching the tag data!', error);
      });
  }, []);

  const tagCounts = tagData.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(tagCounts),
    datasets: [
      {
        data: Object.values(tagCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return <Pie data={data} />;
};

export default DonutChartComponent;

