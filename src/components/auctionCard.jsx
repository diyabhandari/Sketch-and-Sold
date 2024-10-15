import React, { useEffect, useState } from 'react';
import { supabase } from './createClient';
import './AuctionCard.css';

const AuctionCard = ({ title, startingPrice, description, auctionDuration }) => {
  const [currentPrice, setCurrentPrice] = useState(startingPrice);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('items') 
        .select('*');
        fetchData();
    }
  }, []);

  const handleBid = () => {
    // Logic for bidding (increase the current price)
    setCurrentPrice((prevPrice) => prevPrice + 10); // Increment by 10 for each bid
  };

  const formatTimeElapsed = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  };

  return (
    <div className="auction-card">
      <h2>{title}</h2>
      <p className="price">Current Price: ${currentPrice}</p>
      <p className="timer">Time since bid started: {formatTimeElapsed(timeElapsed)}</p>
      <button onClick={handleBid} className="bid-button">Place Bid</button>
    </div>
  );
};

export default AuctionCard;
