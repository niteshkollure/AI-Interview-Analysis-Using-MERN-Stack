import React, { useRef, useState } from 'react';
import './ResumeUpload.css';

const sampleQuestions = [
  'Tell me about yourself.',
  'What are your strengths and weaknesses?',
  'Describe a challenging project you worked on.',
  'Why do you want this job?',
  'Where do you see yourself in 5 years?'
];

function ResumeUpload() {
  const fileInput = useRef();
  const [resumeName, setResumeName] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
      // Simulate AI question generation
      setQuestions(sampleQuestions);
    }
  };

  return (
    <div className="resume-upload-page">
      <h2>Upload Resume</h2>
      <input type="file" ref={fileInput} accept=".pdf,.doc,.docx" onChange={handleUpload} />
      {resumeName && <p>Uploaded: <strong>{resumeName}</strong></p>}
      {questions.length > 0 && (
        <div className="questions-section">
          <h3>AI Interview Questions Based on Resume</h3>
          <ul>
            {questions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;
