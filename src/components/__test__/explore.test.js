import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for testing
import Explore from '../explore'; // Adjust the path based on your file structure

describe('Explore Component', () => {
  it('renders without crashing and displays no items message when auctionItems is empty', async () => {
    render(
      <MemoryRouter>
        <Explore auctionItems={[]} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No items available for auction.')).toBeInTheDocument();
    });
  });

  it('displays auction items when provided', async () => {
    const mockAuctionItems = [
      {
        id: 1,
        item_type: 'Art',
        item_title: 'Beautiful Painting',
        item_image: 'https://example.com/painting.jpg',
        description: 'An elegant landscape painting.',
        Auction: { // Mock Auction data
          currentBidPrice: 1000,
          auctionEndTime: new Date().toISOString(),
        },
      },
      {
        id: 2,
        item_type: 'Antiques',
        item_title: 'Antique Vase',
        item_image: 'https://example.com/vase.jpg',
        description: 'A rare, vintage vase.',
        Auction: { // Mock Auction data
          currentBidPrice: 2000,
          auctionEndTime: new Date().toISOString(),
        },
      },
    ];

    render(
      <MemoryRouter>
        <Explore auctionItems={mockAuctionItems} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Beautiful Painting')).toBeInTheDocument();
      expect(screen.getByText('Antique Vase')).toBeInTheDocument();
    });
  });

  it('handles missing auction items gracefully', async () => {
    render(
      <MemoryRouter>
        <Explore auctionItems={null} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No items available for auction.')).toBeInTheDocument();
    });
  });
});
