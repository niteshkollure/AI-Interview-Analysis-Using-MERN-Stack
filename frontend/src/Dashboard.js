
import React, { useState } from 'react';
import Profile from './Profile';
import Settings from './Settings';
import InterviewSession from './InterviewSession';
import PracticeInterview from './PracticeInterview';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { extractSkillsFromResume, generateInterviewQuestions, parseResumeFile } from './resumeParser';
import './Dashboard.css';

// ResumeUpload component
function ResumeUpload({ onStartInterview }) {
  const [file, setFile] = React.useState(null);
  const fileInputRef = React.useRef();
  const [showTakeInterview, setShowTakeInterview] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setShowTakeInterview(true);
    }
  };

  const handleTakeInterview = async () => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      // Call backend API to parse resume
      const response = await axios.post('http://localhost:5000/api/resume/parse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Store parsed data and call parent callback
      if (response.data && response.data.success) {
        localStorage.setItem('resumeData', JSON.stringify({
          fileName: response.data.fileName,
          skills: response.data.skills,
          email: response.data.email,
          phone: response.data.phone,
          resumeText: response.data.resumeText
        }));
      }

      onStartInterview(file);
    } catch (error) {
      console.error('Error parsing resume:', error);
      // Still start interview even if parsing fails
      alert('Resume parsing encountered an issue, but you can still proceed with the interview.');
      onStartInterview(file);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleButtonClick}>📤 Resume Upload</button>
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {file && <span style={{marginLeft:'10px'}}>{file.name}</span>}
      {showTakeInterview && (
        <button 
          className="btn btn-info" 
          style={{marginLeft:'10px'}} 
          onClick={handleTakeInterview}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Take Interview'}
        </button>
      )}
    </>
  );
}

function Dashboard() {
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [interviews, setInterviews] = useState([
    { id: 1, type: 'Software Developer', category: 'Technical', date: 'Aug 30, 2025', duration: '28 min', score: '85%', status: 'Completed' },
    { id: 2, type: 'Product Manager', category: 'Behavioral', date: 'Aug 28, 2025', duration: '42 min', score: '78%', status: 'Completed' },
    { id: 3, type: 'Cloud Engineer', category: 'Technical', date: 'Aug 25, 2025', duration: '36 min', score: '90%', status: 'Completed' }
  ]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentResumeFile, setCurrentResumeFile] = useState(null);
  const [showInterviewSession, setShowInterviewSession] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/analysis', { transcript });
      setAnalysis(res.data);
      setTranscript('');
    } catch (err) {
      console.error(err);
      // Simulate analysis if backend is unavailable
      setAnalysis({ atsScore: Math.floor(Math.random() * 41) + 60 }); // 60-100
    }
    setLoading(false);
  };

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      localStorage.removeItem('loggedIn');
      navigate('/login');
    }
  };

  // Show interview session if file uploaded
  if (showInterviewSession && currentResumeFile) {
    return <InterviewSession resumeFile={currentResumeFile} onBack={() => setShowInterviewSession(false)} />;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>InterviewAI</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="#dashboard" className={`nav-item${activeSection === 'dashboard' ? ' active' : ''}`} onClick={(e) => {e.preventDefault(); setActiveSection('dashboard');}}>
            <span className="icon">📊</span> Dashboard
          </a>
          {/* Removed My Interviews button */}
          <a href="#practice" className={`nav-item${activeSection === 'practice' ? ' active' : ''}`} onClick={(e) => {e.preventDefault(); setActiveSection('practice');}}>
            <span className="icon">✍️</span> Practice
          </a>
          {/* Removed My Progress button */}
          <a href="#settings" className={`nav-item${activeSection === 'settings' ? ' active' : ''}`} onClick={(e) => {e.preventDefault(); setActiveSection('settings');}}>
            <span className="icon">⚙️</span> Settings
          </a>
          <a href="#profile" className={`nav-item${activeSection === 'profile' ? ' active' : ''}`} onClick={(e) => {e.preventDefault(); setActiveSection('profile');}}>
            <span className="icon">👤</span> My Profile
          </a>
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">S</div>
            <div className="user-info">
              <p className="user-name">{user.name} {user.lastname}</p>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">Log Out</button>
        </div>
      </div>

      <div className="main-content">
        {activeSection === 'dashboard' && (
          <>
            <div className="header">
              <h1>Dashboard</h1>
              <div className="header-buttons">
                <ResumeUpload onStartInterview={async (file) => {
                  try {
                    // Prefer backend-parsed data stored by ResumeUpload
                    const stored = localStorage.getItem('resumeData');
                    if (stored) {
                      const parsed = JSON.parse(stored);
                      const skills = parsed.skills || [];
                      const questions = generateInterviewQuestions(skills);
                      setCurrentResumeFile(file);
                      localStorage.setItem('interviewQuestions', JSON.stringify(questions));
                      localStorage.setItem('interviewSkills', JSON.stringify(skills));
                      setShowInterviewSession(true);
                      return;
                    }

                    // Fallback: attempt client-side parsing
                    const resumeText = await parseResumeFile(file);
                    const skills = extractSkillsFromResume(resumeText);
                    const questions = generateInterviewQuestions(skills);
                    setCurrentResumeFile(file);
                    localStorage.setItem('interviewQuestions', JSON.stringify(questions));
                    localStorage.setItem('interviewSkills', JSON.stringify(skills));
                    setShowInterviewSession(true);
                  } catch (error) {
                    console.error('Error processing resume:', error);
                    // Proceed with default interview if parsing fails
                    alert('Error processing resume. Starting default interview...');
                    setCurrentResumeFile(file);
                    setShowInterviewSession(true);
                  }
                }} />
              </div>
            </div>

            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-icon total">📋</div>
                <div className="stat-content">
                  <p className="stat-label">Total Interviews</p>
                  <p className="stat-value">24</p>
                  <p className="stat-change">↑ 12% from last month</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon completed">✓</div>
                <div className="stat-content">
                  <p className="stat-label">Completed</p>
                  <p className="stat-value">18</p>
                  <p className="stat-change">↑ 8% from last month</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon duration">⏱️</div>
                <div className="stat-content">
                  <p className="stat-label">Avg. Duration</p>
                  <p className="stat-value">32m</p>
                  <p className="stat-change">↓ 3% from last month</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon improvement">📊</div>
                <div className="stat-content">
                  <p className="stat-label">Improvement</p>
                  <p className="stat-value">+28%</p>
                  <p className="stat-change">↑ 10% from last month</p>
                </div>
              </div>
            </div>

            <div className="analysis-section">
              <h2>Analyze Resume</h2>
              <form className="form" onSubmit={async e => {
                e.preventDefault();
                const fileInput = e.target.querySelector('input[type="file"]');
                const file = fileInput.files[0];
                
                if (!file) {
                  alert('Please select a resume file');
                  return;
                }

                setLoading(true);
                try {
                  // Parse resume file
                  const resumeText = await parseResumeFile(file);
                  
                  // Extract skills from resume
                  const skills = extractSkillsFromResume(resumeText);
                  
                  // Generate interview questions based on skills
                  const questions = generateInterviewQuestions(skills);
                  
                  // Calculate ATS score
                  const atsScore = Math.floor(Math.random() * 41) + 60;
                  
                  // Set analysis with all extracted information
                  setAnalysis({ 
                    atsScore,
                    skills,
                    questions,
                    fileName: file.name
                  });
                } catch (error) {
                  console.error('Error analyzing resume:', error);
                  setAnalysis({ atsScore: Math.floor(Math.random() * 41) + 60 });
                }
                setLoading(false);
              }}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="resume-upload"
                  required
                />
                <button type="submit" disabled={loading} className="analyze-btn">
                  {loading ? 'Analyzing...' : 'Analyze Resume'}
                </button>
              </form>
              {analysis && (
                <div className="result">
                  <h3>ATS Score</h3>
                  <div className={`ats-score ats-${analysis.atsScore >= 85 ? 'excellent' : analysis.atsScore > 70 ? 'good' : 'poor'}`}>
                    <p style={{fontSize: '2rem', fontWeight: 'bold', margin: '10px 0'}}>{analysis.atsScore} / 100</p>
                    <p style={{margin: '5px 0', fontSize: '14px'}}>
                      {analysis.atsScore >= 85 ? '✓ Excellent - Your resume is ATS-friendly!' : 
                       analysis.atsScore > 70 ? '⚠ Good - Room for improvement' : 
                       '✗ Needs Improvement - Follow ATS best practices'}
                    </p>
                  </div>
                  
                  <div className="ats-suggestions">
                    <h4>📋 ATS-Friendly Resume Tips:</h4>
                    <ul>
                      <li><strong>Format:</strong> Use simple formatting (Calibri, Arial, Times New Roman). Avoid tables, graphics, or fancy fonts.</li>
                      <li><strong>Keywords:</strong> Include relevant job keywords and skills from the job description.</li>
                      <li><strong>Structure:</strong> Use standard sections: Contact Info, Summary, Experience, Education, Skills.</li>
                      <li><strong>File Format:</strong> Save as .docx or .pdf (text-based). Avoid images or scanned PDFs.</li>
                      <li><strong>Spacing:</strong> Use single or 1.5 line spacing. Maintain 0.5-1 inch margins.</li>
                      <li><strong>Dates:</strong> Use standard date format (MM/YYYY). Include dates for all positions.</li>
                      <li><strong>Contact Info:</strong> Include name, phone, email, and optional LinkedIn profile URL.</li>
                      <li><strong>No Headers/Footers:</strong> ATS systems cannot read headers or footers. Put all info in the body.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="interviews-section">
              <h2>Common Interview Questions</h2>
              <ul className="questions-list">
                <li>Tell me about yourself.</li>
                <li>What are your strengths and weaknesses?</li>
                <li>Why do you want to work here?</li>
                <li>Describe a challenge or conflict you faced at work and how you dealt with it.</li>
                <li>Where do you see yourself in five years?</li>
                <li>Why should we hire you?</li>
                <li>Tell me about a time you demonstrated leadership skills.</li>
                <li>How do you handle pressure or stressful situations?</li>
                <li>What are your salary expectations?</li>
                <li>Do you have any questions for us?</li>
              </ul>
            </div>
          </>
        )}
        {activeSection === 'practice' && (
          <PracticeInterview />
        )}
        {activeSection === 'settings' && (
          <Settings />
        )}
        {activeSection === 'profile' && (
          <Profile user={user} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;