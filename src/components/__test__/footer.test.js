import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../footer'; // Adjust the path as per your folder structure

describe('Footer', () => {
  test('renders the author text with correct year and names', () => {
    render(<Footer />);
    const authorText = screen.getByText(/© 2024 Diya Bhandari, Ishita Sawhney/i);
    expect(authorText).toBeInTheDocument();
  });

  test('renders the GitHub link with correct href', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/ishita-sawhney/Sketch-and-Sold');
  });

  test('renders the GitHub image with correct alt text', () => {
    render(<Footer />);
    const githubImage = screen.getByAltText(/GitHub repository/i);
    expect(githubImage).toBeInTheDocument();
    expect(githubImage).toHaveAttribute('src', '/githublogo.png');
  });
});

