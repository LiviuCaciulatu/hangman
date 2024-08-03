// src/components/Login.js
import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showNewUserMenu, setShowNewUserMenu] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginButtonClick = () => {
    setShowLoginMenu(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    onLogin();
  };

  const handleNewUser = () => {
    setShowNewUserMenu(true);
  };

  const handleNewUserSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Store user data (in a real app, send this to a backend server)
    localStorage.setItem('user', JSON.stringify({ username: userData.username, password: userData.password }));
    alert('User created successfully');
    setShowNewUserMenu(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="login-container">
      {!showLoginMenu && !showNewUserMenu ? (
        <button onClick={handleLoginButtonClick}>Log In</button>
      ) : showNewUserMenu ? (
        <form onSubmit={handleNewUserSubmit} className="new-user-form">
          <div>
            <label htmlFor="newUsername">Username:</label>
            <input
              type="text"
              id="newUsername"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword">Password:</label>
            <input
              type="password"
              id="newPassword"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Create Account</button>
        </form>
      ) : (
        <form onSubmit={handleLoginSubmit} className="login-form">
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
          <button type="button" onClick={handleNewUser}>New User</button>
        </form>
      )}
    </div>
  );
};

export default Login;


