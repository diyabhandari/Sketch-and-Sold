import React, { useEffect, useState } from 'react';
import { supabase } from '../createClient';
import AuctionCard from './auctionCard'; 
import './styles/myBids.css'
const MyBids = ({ username }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      setLoading(true);

      //fetch from userBids table, join items and auctions
      const { data, error } = await supabase
        .from('userBids')
        .select(`
          item_id,
          Items (
            item_id,
            item_title,
            item_image,
            description,
            base_price,
            auction_id,
            Auction!Auction_item_id_fkey("currentBidPrice")
          )
        `)
        .eq('username', username); //username of current user is passed as prop to this component from parent component, make login return username ?

      if (error) {
        console.error('Error fetching bids:', error);
      } else {
        console.log('Fetched bids:', data); // Log the fetched data to ensure it looks correct
        setBids(data);
      }

      setLoading(false);
    };

    fetchBids();
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-bids-container">
      <h1 className = "heading">My Bids</h1>
      <div>
      {bids.length === 0 ? (
        <p>You have no active bids.</p>
      ) : (
        bids.map((bid) => (
          <AuctionCard
            key={bid.item_id}
            title={bid.Items.item_title}
            image={bid.Items.item_image}
            description={bid.Items.description}
            basePrice={bid.Items.base_price}
            currentBidPrice={bid.Items.Auction?.currentBidPrice}
          />
        ))
      )}
      </div> 
    </div>
  );
};

export default MyBids;
