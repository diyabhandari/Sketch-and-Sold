import React from 'react';
import backgroundImage from '/image.png';
import '../components/styles/welcome.css'; // Import your CSS file here

const WelcomePage = () => {
    return (
        <div className="welcome-container">
            
                <h1 className="text-shadow">Welcome to Our Auction Site!</h1>
            
            <div className="welcome-message">
                <p>Your one-stop destination for bidding on exclusive items!</p>
            </div>
            <a href="/auctions" className="button">
                Start Bidding
            </a>
        </div>
    );
};

export default WelcomePage;
