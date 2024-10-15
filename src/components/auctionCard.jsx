import React, { useEffect, useState } from 'react';
import { supabase } from '../createClient';
import './AuctionCard.css';

const AuctionCard = ({ title, image, description, basePrice, currentBidPrice }) => {
  return (
    <div className="auction-card">
      <img src={image} alt={title} className="auction-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Base Price: ${basePrice}</p>
      <p>Current Bid Price: ${currentBidPrice}</p>
      <button>Place Bid</button>
    </div>
  );
};

export default AuctionCard;
