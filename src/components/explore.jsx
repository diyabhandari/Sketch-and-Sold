import React, { useEffect, useState } from 'react';
import { supabase } from '../createClient'; // Adjust your Supabase client import as needed
import AuctionCard from './auctionCard'; 

const Explore = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      
      // Fetch items and specify the relationship explicitly
      const { data, error } = await supabase
        .from('Items')
        .select(`
          item_id,
          item_title,
          item_image,
          description,
          base_price,
          auction_id,
          Auction!Auction_item_id_fkey("currentBidPrice")
        `)
        .not('auction_id', 'is', null); // Fetch only items where auction_id is not null

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        console.log('Fetched items:', data); // Log the fetched data to check the result
        setItems(data);
      }

      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="explore-container">
      {items.length === 0 ? (
        <p>No items available for auction.</p>
      ) : (
        items.map((item) => (
          <AuctionCard
            key={item.item_id}
            title={item.item_title}
            image={item.item_image}
            description={item.description}
            basePrice={item.base_price}
            currentBidPrice={item.Auction?.currentBidPrice}  // Ensure this field is accessed correctly
          />
        ))
      )}
    </div>
  );
};

export default Explore;
