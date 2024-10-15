import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Signup.css'; 
import { supabase } from '../createClient';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const navigate = useNavigate();
  //const [userType, setUserType] = useState('artist'); // State for user type
  async function getNextUserId() {
    //auto increment implemented here, as supabase one is giving errors
    const { data, error } = await supabase
      .from('users')
      .select('user_id')
      .order('user_id', { ascending: false }) 
      .limit(1); //we only need the highest value
    
    if (error) {
      console.error('Error fetching max user_id:', error.message);
      return null; 
    }
    const nextUserId = data[0].user_id + 1 ; //data here represents that last row
    return nextUserId;
  }

  async function handleSubmit(e){
    e.preventDefault();
    const nextUserId = await getNextUserId();
    if (!nextUserId) {
      alert('unable to generate user id');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const {data,error} = await supabase
      .from('users')
      .insert({ 
        user_id: nextUserId,
        username: username, 
        password: password,
        wallet: 40000,
        role: 'Buyer'
      });
      if (error) {
        console.log('Error saving user:', error.message);
        alert(error.message);
      } else {
        console.log('User created:', data);
        alert('Sign up successful!');
        //navigate('/userDashboard'); //check whether you can load specific user dashboard this way
        //take username, must be unique, load page acc to it
      }

    console.log('Username:', username);
    console.log('Password:', password);
    //console.log('User Type:', userType); // Log user type
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

        {/*<div className="form-group">
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
        </div>*/}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
