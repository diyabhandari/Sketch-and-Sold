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
