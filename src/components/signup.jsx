import React, { useState } from 'react';
import './styles/Signup.css'; 

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const [userType, setUserType] = useState('artist'); // State for user type

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('User Type:', userType); // Log user type
    // Reset the form
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
            type="password"
            id="password"
            data-testid="password-input" // Added data-testid
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        </div>
        <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
            type="password"
            id="confirm-password"
            data-testid="confirm-password-input" // Added data-testid
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
        />
        </div>

        <div className="form-group">
          <label htmlFor="user-type">I am a:</label>
          <select
            id="user-type"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="artist">Artist</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>
        <button type="submit" className="signup-button">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
