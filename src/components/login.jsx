import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './styles/Login.css'; 
import { supabase } from '../createClient';

const Login = () => {
  const navigate = useNavigate();
  const { setUsername } = useContext(UserContext); // Access the context
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    const {data,error} = await supabase
      .from('users')
      .select('username,password')
      .eq('username',username) //match entered username
      .single();
    if(error){
      console.log("supabase connection failed");
    }
    if(data===null){
      console.log("user not found")
      alert("user not found, please sign up")
      navigate('/signup')
    }
    else{
      if(data.password === password){
        console.log("successfull login")
        setUsername(username); // Store the username in context
        navigate('/userDashboard'); // Navigate to user dashboard
      }else{
        alert("incorrect password entered")
      }
    }
    console.log('Username:', username);
    console.log('Password:', password);
    // Reset the form
    setUsernameInput('');
    setPassword('');
  };

 

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsernameInput(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button" onClick={()=> handleSubmit}>Login</button>
      </form>
    </div>
  );
};

export default Login;
