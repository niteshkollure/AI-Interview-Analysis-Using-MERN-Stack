import React from 'react';
import './MyInterviews.css';

function MyInterviews() {
  // Example interviews
  const interviews = [
    { id: 1, title: 'Software Developer', field: 'Technical', date: 'Aug 30, 2025', status: 'Completed' },
    { id: 2, title: 'Product Manager', field: 'Behavioral', date: 'Aug 28, 2025', status: 'Completed' },
    { id: 3, title: 'Cloud Engineer', field: 'Technical', date: 'Aug 25, 2025', status: 'Completed' }
  ];

  return (
    <div className="myinterviews-page">
      <h2>My Interviews</h2>
      <table className="myinterviews-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Field</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((i) => (
            <tr key={i.id}>
              <td>{i.title}</td>
              <td>{i.field}</td>
              <td>{i.date}</td>
              <td>{i.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyInterviews;
