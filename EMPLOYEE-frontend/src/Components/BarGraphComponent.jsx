import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const BarGraphComponent = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    axios.get('https://employeelogin.vercel.app/auth/get_employee_projects')
      .then(response => {
        setProjectData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the project data!', error);
      });
  }, []);

  const data = {
    labels: projectData.map(project => project.name),
    datasets: [
      {
        label: 'Total Time Spent',
        data: projectData.map(project => project.totalTime),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarGraphComponent;
