import React from 'react';
import './styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="author">
          <p>&copy; 2024 Diya Bhandari, Ishita Sawhney</p>
        </div>
        <a href="https://github.com/diyabhandari/Sketch-and-Sold" target="_blank" rel="noopener noreferrer">
          <img src="/githublogo.png" alt="GitHub repository" className="github-logo" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
