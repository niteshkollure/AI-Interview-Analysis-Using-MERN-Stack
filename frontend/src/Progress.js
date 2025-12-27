import React from 'react';
import './Progress.css';

function Progress() {
  // Example progress data
  const progress = [
    { month: 'June', interviews: 3, improvement: 10 },
    { month: 'July', interviews: 5, improvement: 18 },
    { month: 'August', interviews: 7, improvement: 28 },
  ];

  return (
    <div className="progress-page">
      <h2>My Progress</h2>
      <table className="progress-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Interviews</th>
            <th>Improvement (%)</th>
          </tr>
        </thead>
        <tbody>
          {progress.map((row, idx) => (
            <tr key={idx}>
              <td>{row.month}</td>
              <td>{row.interviews}</td>
              <td>{row.improvement}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Progress;
