import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Sketch&Sold</h1>
      </div>
      <div className="right-section">
        <div>
          <div>
            <div>Login</div>
            <div> | </div>
            <div>Signup</div>
          </div>
        </div>
        <p className="tagline">Create, sell and discover!</p>
      </div>
    </header>
  );
};

export default Header;
