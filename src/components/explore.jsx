import React, { useEffect, useState, useRef, useContext } from 'react';
import { supabase } from '../createClient'; // Adjust your Supabase client import as needed
import AuctionCard from './auctionCard';
import './styles/explore.css'; // Ensure the CSS file is imported
import { UserContext } from '../UserContext';

const Explore = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBidInput, setShowBidInput] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  
  // Create a ref for the bid input field
  const bidInputRef = useRef(null);

  const { username } = useContext(UserContext);
  console.log('Current username:', username);
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('Items')
        .select(`
          item_id,
          item_title,
          item_image,
          description,
          base_price,
          auction_id,
          current_bid_price
        `)
        .eq('sold', false) 
        .not('auction_id', 'is', null);

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        setItems(data);
      }

      setLoading(false);
    };

    /*const checkUser = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUser(userData?.user);
      }
    };*/

    fetchItems();
  }, []);
  const placeBid = async (itemId, current_bid_price) => {
    const newBid = parseFloat(bidAmount);

    if (newBid <= current_bid_price) {
      alert('Bid must be higher than the current bid price.');
      return;
    }

    // Step 1: Get the next userBid_index
    const { data: userBidsData, error: fetchBidsError } = await supabase
    .from('userBids')
    .select('user_bids_index')
    .order('user_bids_index', { ascending: false })
    .limit(1);

    if (fetchBidsError) {
    console.error('Error fetching user bids:', fetchBidsError);
    return;
    }

    // Ensure userBid_index increments correctly
    const nextBidIndex = userBidsData.length > 0 ? userBidsData[0].user_bids_index + 1 : 1;


    // Step 2: Insert new bid into the `userBids` table
    const { error: insertBidError } = await supabase
    .from('userBids')
    .insert({
      item_id: itemId,
      user_bids_index: nextBidIndex,
      username:username,  // Ensure this is not null
    });

    if (insertBidError) {
      console.error('Error inserting bid:', insertBidError);
    } else {
      console.log('Bid inserted successfully!');
    }
  };
  

  const goLeft = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
    setShowBidInput(false);
  };

  const goRight = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
    setShowBidInput(false);
  };

  // Function to toggle bid input and scroll to it
  const toggleBidInput = () => {
    setShowBidInput(!showBidInput);
    if (!showBidInput) {
      setTimeout(() => {
        bidInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="explore-page">
      <h1 className="explore-heading">EXPLORE</h1>
      <div className="explore-slider-container">
        <button className="slider-arrow left" onClick={goLeft}>
          &#8249;
        </button>

        <div className="explore-slider">
          {items.length === 0 ? (
            <p>No items available for auction.</p>
          ) : (
            <div key={items[currentIndex].item_id} className="auction-card-container">
              {console.log('Current item data:', items[currentIndex])}
              {console.log('Props being passed to AuctionCard:', {
                title: items[currentIndex].item_title,
                image: items[currentIndex].item_image,
                description: items[currentIndex].description,
                basePrice: items[currentIndex].base_price,
                current_bid_price: items[currentIndex].current_bid_price,
              })
              }
              <AuctionCard
                title={items[currentIndex].item_title}
                image={items[currentIndex].item_image}
                description={items[currentIndex].description}
                basePrice={items[currentIndex].base_price}
                current_bid_price={items[currentIndex].current_bid_price}
                className="auction-card"
              />
              <button
                onClick={toggleBidInput} // Use the new toggle function
                className="bid-button"
              >
                {showBidInput ? 'Cancel Bid' : 'Create Bid'}
              </button>

              {showBidInput && (
                <div className="bid-section" ref={bidInputRef}> {/* Set the ref here */}
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter bid amount"
                    className="bid-input"
                  />
                  <button
                    onClick={() =>
                      placeBid(
                        items[currentIndex].item_id,
                        items[currentIndex].current_bid_price
                      )
                    }
                    className="submit-bid-button"
                  >
                    Place Bid
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button className="slider-arrow right" onClick={goRight}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Explore;