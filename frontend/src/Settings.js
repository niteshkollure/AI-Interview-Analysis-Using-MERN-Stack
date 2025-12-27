import React, { useState, useEffect } from 'react';
import './Settings.css';

function Settings() {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'light');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [audioVolume, setAudioVolume] = useState(80);
  const [feedbackDetail, setFeedbackDetail] = useState('detailed');
  const [analysisType, setAnalysisType] = useState('comprehensive');
  const [emailNotification, setEmailNotification] = useState(true);
  const [smsNotification, setSmsNotification] = useState(false);
  const [pushNotification, setPushNotification] = useState(true);
  const [reminderNotification, setReminderNotification] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  }, [mode]);

  const handleModeChange = (m) => {
    setMode(m);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password changed successfully!');
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      {/* Theme Mode Section */}
      <div className="settings-section">
        <div className="section-header">
          <h3>🌓 Theme Mode</h3>
        </div>
        <div className="mode-section">
          <button 
            className={`mode-btn ${mode === 'light' ? 'active' : ''}`} 
            onClick={() => handleModeChange('light')}
          >
            ☀️ Light Mode
          </button>
          <button 
            className={`mode-btn ${mode === 'dark' ? 'active' : ''}`} 
            onClick={() => handleModeChange('dark')}
          >
            🌙 Dark Mode
          </button>
        </div>
      </div>

      {/* Audio & Camera Settings */}
      <div className="settings-section">
        <div className="section-header">
          <h3>🎤 Audio & Camera Settings</h3>
        </div>
        <div className="settings-item">
          <div className="setting-control">
            <label>
              <input 
                type="checkbox" 
                checked={audioEnabled} 
                onChange={() => setAudioEnabled(!audioEnabled)}
              />
              Enable Microphone
            </label>
          </div>
        </div>
        <div className="settings-item">
          <label>Microphone Volume: {audioVolume}%</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={audioVolume}
            onChange={(e) => setAudioVolume(e.target.value)}
            className="slider"
          />
        </div>
        <div className="settings-item">
          <div className="setting-control">
            <label>
              <input 
                type="checkbox" 
                checked={cameraEnabled} 
                onChange={() => setCameraEnabled(!cameraEnabled)}
              />
              Enable Camera
            </label>
          </div>
        </div>
      </div>

      {/* Feedback & Analysis Settings */}
      <div className="settings-section">
        <div className="section-header">
          <h3>📊 Feedback & Analysis Settings</h3>
        </div>
        <div className="settings-item">
          <label htmlFor="feedback-detail">Feedback Detail Level:</label>
          <select 
            id="feedback-detail"
            value={feedbackDetail} 
            onChange={(e) => setFeedbackDetail(e.target.value)}
            className="select-input"
          >
            <option value="basic">Basic - Brief feedback only</option>
            <option value="detailed">Detailed - Comprehensive analysis</option>
            <option value="advanced">Advanced - In-depth insights & recommendations</option>
          </select>
        </div>
        <div className="settings-item">
          <label htmlFor="analysis-type">Analysis Type:</label>
          <select 
            id="analysis-type"
            value={analysisType} 
            onChange={(e) => setAnalysisType(e.target.value)}
            className="select-input"
          >
            <option value="performance">Performance Focus</option>
            <option value="comprehensive">Comprehensive Analysis</option>
            <option value="improvement">Improvement Focused</option>
          </select>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="settings-section">
        <div className="section-header">
          <h3>🔔 Notification Preferences</h3>
        </div>
        <div className="settings-item">
          <div className="setting-control">
            <label>
              <input 
                type="checkbox" 
                checked={emailNotification} 
                onChange={() => setEmailNotification(!emailNotification)}
              />
              Email Notifications
            </label>
            <span className="description">Receive updates via email</span>
          </div>
        </div>
        <div className="settings-item">
          <div className="setting-control">
            <label>
              <input 
                type="checkbox" 
                checked={smsNotification} 
                onChange={() => setSmsNotification(!smsNotification)}
              />
              SMS Notifications
            </label>
            <span className="description">Receive important updates via SMS</span>
          </div>
        </div>
        <div className="settings-item">
          <div className="setting-control">
            <label>
              <input 
                type="checkbox" 
                checked={pushNotification} 
                onChange={() => setPushNotification(!pushNotification)}
              />
              Push Notifications
            </label>
            <span className="description">Get real-time push notifications</span>
          </div>
        </div>
        <div className="settings-item">
          <div className="setting-control">
            <label>
              <input 
                type="checkbox" 
                checked={reminderNotification} 
                onChange={() => setReminderNotification(!reminderNotification)}
              />
              Interview Reminders
            </label>
            <span className="description">Remind me about scheduled interviews</span>
          </div>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="settings-section">
        <div className="section-header">
          <h3>🔐 Change Password</h3>
        </div>
        <form className="password-section" onSubmit={handlePasswordChange}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Current Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <label className="checkbox-label">
            <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> 
            Show Passwords
          </label>
          <button type="submit" className="btn-change-password">Change Password</button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
