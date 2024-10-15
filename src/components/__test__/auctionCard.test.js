import React from 'react';
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
