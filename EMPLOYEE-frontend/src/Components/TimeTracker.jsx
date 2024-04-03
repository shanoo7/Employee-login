import React, { useState, useRef, useEffect } from "react";
import { PieChart, Pie, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip } from 'recharts';

const Stopwatch = () => {
  const [projectName, setProjectName] = useState("");
  const [tag, setTag] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pausedTime, setPausedTime] = useState(0);
  const [projects, setProjects] = useState([]);

  const intervalRef = useRef();

  useEffect(() => {
    if (isRunning) {
      startTimer();
    }
    return () => {
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [isRunning]);

  const startTimer = () => {
    const startTime = Date.now() - pausedTime;
    intervalRef.current = setInterval(() => {
      setTimeElapsed(Date.now() - startTime);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setPausedTime(timeElapsed);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimeElapsed(0);
    setPausedTime(0);
  };

  const handleStart = () => {
    if (!projectName.trim()) {
      alert("Project name is required!");
      return;
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    stopTimer();
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    resetTimer();
    setProjectName("");
    setTag("");
    setIsRunning(false);
  };

  const handleSubmit = () => {
    if (!projectName.trim()) {
      alert("Project name is required!");
      return;
    }
    setProjects((prevProjects) => [
      ...prevProjects,
      {
        projectName,
        tag,
        timeElapsed: Math.floor(timeElapsed / 1000), // Convert milliseconds to seconds
      },
    ]);
    handleReset();
  };

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Data for pie chart
  const pieChartData = projects.map(project => ({ name: project.projectName, value: project.timeElapsed }));

  // Data for bar chart
  const barChartData = projects.map(project => ({ name: project.projectName, timeElapsed: project.timeElapsed }));

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-p-4">
      <div className="tw-mb-4">
        <div className="tw-flex tw-mb-4">
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="tw-border tw-border-gray-300 tw-px-2 tw-py-1 tw-mr-2"
          />
          <input
            type="text"
            placeholder="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="tw-border tw-border-gray-300 tw-px-2 tw-py-1 tw-mr-2"
          />
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={!projectName.trim()} // Disable button if projectName is empty or contains only whitespace
              className={`tw-bg-blue-500 tw-hover:bg-blue-700 tw-text-white tw-font-bold tw-py-1 tw-px-4 tw-rounded ${!projectName.trim() && "tw-opacity-50 tw-cursor-not-allowed"}`}
            >
              Start
            </button>
          ) : (
            <>
              <button
                onClick={handlePause}
                className="tw-bg-red-500 tw-hover:bg-red-700 tw-text-white tw-font-bold tw-py-1 tw-px-4 tw-rounded tw-mr-2"
              >
                Pause
              </button>
              <button
                onClick={handleReset}
                className="tw-bg-gray-500 tw-hover:bg-gray-700 tw-text-white tw-font-bold tw-py-1 tw-px-4 tw-rounded"
              >
                Reset
              </button>
            </>
          )}
        </div>
        <div>
  <h2 className="tw-font-bold">Time Taken: {formatTime(timeElapsed)}</h2>
</div>
      </div>
      {projects.length > 0 && (
        <div className="tw-mb-4">
          <h2 className="tw-font-bold">Project History:</h2>
          <ul>
            {projects.map((project, index) => (
              <li key={index}>
                Project Name: {project.projectName}, Tag: {project.tag}, Time
                Elapsed: {project.timeElapsed} seconds
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        {isRunning && (
          <button
            onClick={handleSubmit}
            className="tw-bg-green-500 tw-hover:bg-green-700 tw-text-white tw-font-bold tw-py-1 tw-px-4 tw-rounded"
          >
            Submit
          </button>
        )}
        {!isRunning && pausedTime > 0 && (
          <button
            onClick={handleResume}
            className="tw-bg-blue-500 tw-hover:bg-blue-700 tw-text-white tw-font-bold tw-py-1 tw-px-4 tw-rounded"
          >
            Resume
          </button>
        )}
      </div>
      <div>
        <h2>Pie Chart</h2>
        <PieChart width={400} height={400}>
          <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <div>
        <h2>Bar Chart</h2>
        <BarChart
          width={500}
          height={300}
          data={barChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="timeElapsed" fill="#8884d8" />
          <BarTooltip />
        </BarChart>
      </div>
    </div>
  );
};

export default Stopwatch;