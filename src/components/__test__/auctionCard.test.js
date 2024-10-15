/*import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AuctionCard from './AuctionCard';

jest.useFakeTimers(); // Use fake timers to control time-based actions

describe('AuctionCard', () => {
    
  test('renders auction card with correct title and starting price', () => {
    render(<AuctionCard title={title} startingPrice={startingPrice} />);
    
    // Check if title and starting price are rendered
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(`Current Price: $${startingPrice}`)).toBeInTheDocument();
  });

  test('updates the current price when bid button is clicked', () => {
    render(<AuctionCard title={title} startingPrice={startingPrice} />);
    
    const bidButton = screen.getByText('Place Bid');
    
    // Click the bid button
    fireEvent.click(bidButton);
    
    // Expect the price to have increased by 10
    expect(screen.getByText(`Current Price: $${startingPrice + 10}`)).toBeInTheDocument();
  });

  test('updates the timer correctly', () => {
    render(<AuctionCard title={title} startingPrice={startingPrice} />);
    
    // Fast forward time by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Check if the timer shows 0h 0m 5s
    expect(screen.getByText(/Time since bid started: 0h 0m 5s/)).toBeInTheDocument();
  });

  test('renders timer starting at 0 seconds', () => {
    render(<AuctionCard title={title} startingPrice={startingPrice} />);
    
    // Check if the timer shows 0h 0m 0s
    expect(screen.getByText(/Time since bid started: 0h 0m 0s/)).toBeInTheDocument();
  });
});
*/
import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import AuctionCard from '../auctionCard';

describe('AuctionCard', () => {
  it('renders without crashing', () => {
    const { getByText, getByAltText } = render(
      <AuctionCard
        title="Antique Vase"
        image="https://example.com/vase.jpg"
        description="A beautiful antique vase."
        currentBid={150}
        auctionEndTime={Date.now() + 10000}
      />
    );

    expect(getByText('Antique Vase')).toBeInTheDocument();
    expect(getByAltText('Antique Vase')).toBeInTheDocument();
    expect(getByText('A beautiful antique vase.')).toBeInTheDocument();
    expect(getByText('Current Bid: $150')).toBeInTheDocument();
    expect(getByText(/Auction ends at:/)).toBeInTheDocument();
  });

  it('displays auction end time correctly', () => {
    const auctionEndTime = Date.now() + 3600000; // 1 hour from now
    const { getByText } = render(
      <AuctionCard
        title="Antique Vase"
        image="https://example.com/vase.jpg"
        description="A beautiful antique vase."
        currentBid={200}
        auctionEndTime={auctionEndTime}
      />
    );

    const auctionEndText = new Date(auctionEndTime).toLocaleString();
    expect(getByText(`Auction ends at: ${auctionEndText}`)).toBeInTheDocument();
  });
});
