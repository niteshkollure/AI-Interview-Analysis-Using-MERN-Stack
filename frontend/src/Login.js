import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  // Initialize with a demo user if no user exists
  React.useEffect(() => {
    if (!localStorage.getItem('user')) {
      const demoUser = {
        name: 'Demo',
        lastname: 'User',
        email: 'demo@example.com',
        password: 'demo123'
      };
      localStorage.setItem('user', JSON.stringify(demoUser));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      localStorage.setItem('user', JSON.stringify(formData));
      alert('Signed up successfully!');
      // Clear form and switch to login
      setFormData({
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setIsSignup(false);
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.email === formData.email && user.password === formData.password) {
        localStorage.setItem('loggedIn', 'true');
        // Clear form before navigation
        setFormData({
          name: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        window.location.replace('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        {!isSignup && (
          <div style={{
            backgroundColor: '#e3f2fd',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            fontSize: '13px',
            border: '1px solid #90caf9'
          }}>
            <p style={{margin: '5px 0'}}><strong>Demo Credentials:</strong></p>
            <p style={{margin: '3px 0'}}>Email: demo@example.com</p>
            <p style={{margin: '3px 0'}}>Password: demo123</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          {isSignup && (
            <>
              <input
                type="text"
                name="name"
                placeholder="First Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        </form>
        <button onClick={() => {
          setIsSignup(!isSignup);
          // Clear form when switching modes
          setFormData({
            name: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
        }} className="toggle-btn">
          {isSignup ? 'Already have an account? Login' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
}

export default Login;