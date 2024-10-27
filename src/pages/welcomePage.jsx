import React from 'react';
import backgroundImage from '/image.png';
import '../components/styles/welcome.css'; // Import your CSS file here
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
    const clickStart = () => {
        navigate('/login');
    }
    return (
        <div className="welcome-container">
            
                <h1 className="text-shadow">Welcome to Our Auction Site!</h1>
            
            <div className="welcome-message">
                <p>Your one-stop destination for bidding on exclusive items!</p>
            </div>
            <button className="button" onClick={clickStart}>
                Start Bidding
            </button>
        </div>
    );
};

export default WelcomePage;
