import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../createClient'; // Adjust your Supabase client import as needed
import AuctionCard from './auctionCard';
import './styles/explore.css'; // Ensure the CSS file is imported

const Explore = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBidInput, setShowBidInput] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [user, setUser] = useState(null);
  
  // Create a ref for the bid input field
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

      // Optionally refresh the items data
      const { data: updatedItems } = await supabase
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
      setItems(updatedItems);
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
              <AuctionCard
                title={items[currentIndex].item_title}
                image={items[currentIndex].item_image}
                description={items[currentIndex].description}
                basePrice={items[currentIndex].base_price}
                currentBidPrice={items[currentIndex].Auction?.currentBidPrice}
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
                        items[currentIndex].Auction?.currentBidPrice
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