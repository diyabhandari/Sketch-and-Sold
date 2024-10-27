
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../createClient';
import AuctionCard from './auctionCard';
import './styles/explore.css';

const Explore = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBidInput, setShowBidInput] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Current index for visible items
  const visibleItems = 3; // Number of visible cards at once
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
          Auction!Auction_item_id_fkey(currentBidPrice)
        `)
        .not('auction_id', 'is', null);

      if (error) {
        console.error('Error fetching items:', error);
      } else {
        setItems(data);
      }
      setLoading(false);
    };

    const checkUser = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUser(userData?.user);
      }
    };

    fetchItems();
    checkUser();
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

  const placeBid = async (itemId, currentBidPrice) => {
    const newBid = parseFloat(bidAmount);

    if (newBid <= currentBidPrice) {
      alert('Bid must be higher than the current bid price.');
      return;
    }

    const { data, error } = await supabase
      .from('Auction')
      .update({ currentBidPrice: newBid })
      .eq('item_id', itemId);

    if (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place the bid. Please try again.');
    } else {
      alert('Bid placed successfully!');
      setBidAmount('');
      setShowBidInput(false);
      fetchItems(); // You may want to refresh the items here if needed
    }
  };

  const goLeft = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        // If at the first, wrap around to show last two and first
        return items.length - 1; // Display the last item and the first two on next click
      } else if (prevIndex === 1) {
        // If at the second item, go back to show the last two items
        return 0; // Show the last two items on next click
      } else {
        return Math.max(prevIndex - 1, 0); // Go back to the previous index
      }
    });
    setShowBidInput(false);
  };

  const goRight = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + 1 === items.length) {
        // If at the last item, wrap around to show last two and first
        return 0; // Show the first item and the last two on next click
      }  else {
        return Math.min(prevIndex + 1, items.length - 1); // Go forward to the next index
      }
    });
    setShowBidInput(false);
  };

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

  // Get the visible items based on currentIndex
  const visibleItemsArray = items.slice(currentIndex, currentIndex + visibleItems);

  // Handle wrapping around the visible items
  const wrappedVisibleItems = [...visibleItemsArray];

  // If there are not enough items left for visibleItems, wrap around
  if (wrappedVisibleItems.length < visibleItems && items.length > visibleItems) {
    const remainingItemsCount = visibleItems - wrappedVisibleItems.length;
    const wrapAroundItems = items.slice(0, remainingItemsCount);
    wrappedVisibleItems.push(...wrapAroundItems);
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
            wrappedVisibleItems.map((item) => (
              <div key={item.item_id} className="auction-card-container">
                <AuctionCard
                  title={item.item_title}
                  image={item.item_image}
                  description={item.description}
                  basePrice={item.base_price}
                  currentBidPrice={item.Auction?.currentBidPrice}
                  className="auction-card"
                />
                <button
                  onClick={toggleBidInput}
                  className="bid-button"
                >
                  {showBidInput ? 'Cancel Bid' : 'Create Bid'}
                </button>

                {showBidInput && (
                  <div className="bid-section" ref={bidInputRef}>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="Enter bid amount"
                      className="bid-input"
                    />
                    <button
                      onClick={() =>
                        placeBid(item.item_id, item.Auction?.currentBidPrice)
                      }
                      className="submit-bid-button"
                    >
                      Place Bid
                    </button>
                  </div>
                )}
              </div>
            ))

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