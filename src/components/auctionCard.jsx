import React, { useEffect, useState } from 'react';
import { supabase } from '../createClient';
import './AuctionCard.css';

/*const AuctionCard = ({ title, startingPrice, description, auctionDuration }) => {
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
*/

const AuctionCard = ({ title, image, description, currentBid, auctionEndTime }) => (
  <div className="auction-card">
    <img src={image} alt={title} />
    <h3>{title}</h3>
    <p>{description}</p>
    <p>Current Bid: ${currentBid}</p>
    <p>Auction ends at: {new Date(auctionEndTime).toLocaleString()}</p>
  </div>
);

export default AuctionCard;