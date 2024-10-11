// Header.test.js
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../header';

// Test suite for Header component
describe('Header', () => {
  test('renders the logo with the correct text', () => {
    render(<Header />);
    const logoElement = screen.getByText(/Sketch&Sold/i);
    expect(logoElement).toBeInTheDocument();
  });

  test('renders the login and signup links', () => {
    render(<Header />);
    const loginLink = screen.getByText(/Login/i);
    const signupLink = screen.getByText(/Sign Up/i);

    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '#login');
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute('href', '#signup');
  });

  test('renders the correct tagline', () => {
    render(<Header />);
    const taglineElement = screen.getByText(/Create, sell and discover!/i);
    expect(taglineElement).toBeInTheDocument();
  });
});

