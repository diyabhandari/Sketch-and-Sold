import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const clickLoginLink = () => {
    navigate('/login');
  }
  const clickSignUpLink = () => {
    navigate('/signup');
  }
  return (
    <header className="header">
      <div className="logo">
        <h1>Sketch&Sold</h1>
      </div>
      <div className="right-section">
        <div>
          <div className='container'> 
            <div className = 'loginLink' onClick={clickLoginLink}>Login</div>
            <div className='separator'> | </div>
            <div className = 'loginLink' onClick={clickSignUpLink}>Signup</div>
          </div>
        </div>
        <p className="tagline">Create, sell and discover!</p>
      </div>
    </header>
  );
};

export default Header;
