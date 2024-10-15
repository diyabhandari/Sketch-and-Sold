import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { supabase } from '../createClient';
import AuctionCard from './auctionCard';

const Explore = ({ auctionItems: propAuctionItems }) => {
  const [auctionItems, setAuctionItems] = useState(propAuctionItems || []);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    if (!propAuctionItems) {
      const fetchAuctionItems = async () => {
        // Fetch data from the 'Items' table along with the related 'Auction' data
        const { data, error } = await supabase
          .from('Items') // Fetching from Items table
          .select(`
            *, Auction (currentBidPrice, auctionEndTime) 
          `)
          .is('auction_id', null); // Fetch only where auction_id is null

        if (error) {
          console.log('Error fetching auction items:', error);
          return;
        } else {
          console.log('Fetched auction items:', data);  // Log fetched data
          setAuctionItems(data);
        }

        if (!data || data.length === 0) {
          console.log('No auction items found');
          navigate('/no-auction-items'); // Navigate to a different page if no items are found
        }
      };

      fetchAuctionItems();
    }
  }, [propAuctionItems, navigate]); // Include navigate in the dependency array

  return (
    <div className="explore-container">
      {auctionItems.length > 0 ? (
        auctionItems.map((item) => (
          <AuctionCard
            key={item.id}
            type={item.item_type}
            title={item.item_title}
            image={item.item_image}
            description={item.description}
            currentBid={item.Auction?.currentBidPrice} // Accessing the joined Auction data
            auctionEndTime={item.Auction?.auctionEndTime} // Accessing the joined Auction data
          />
        ))
      ) : (
        <p>No items available for auction.</p>
      )}
    </div>
  );
};

export default Explore;
