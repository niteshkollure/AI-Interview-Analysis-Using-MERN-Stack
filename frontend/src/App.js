import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  useEffect(() => {
    // Apply saved theme on app load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={localStorage.getItem('loggedIn') === 'true' ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={localStorage.getItem('loggedIn') === 'true' ? "/dashboard" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;