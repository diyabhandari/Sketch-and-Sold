// Header.test.js
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../header';

describe('Header Component', () => {
  test('renders the logo', () => {
    render(<Header />);
    const logoElement = screen.getByText(/Website Logo/i);
    expect(logoElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Header />);
    
    const homeLink = screen.getByText(/Home/i);
    const aboutLink = screen.getByText(/About/i);
    const servicesLink = screen.getByText(/Services/i);
    const contactLink = screen.getByText(/Contact/i);
    
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(servicesLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });

  test('has correct links', () => {
    render(<Header />);
    
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink.closest('a')).toHaveAttribute('href', '#home');

    const aboutLink = screen.getByText(/About/i);
    expect(aboutLink.closest('a')).toHaveAttribute('href', '#about');

    const servicesLink = screen.getByText(/Services/i);
    expect(servicesLink.closest('a')).toHaveAttribute('href', '#services');

    const contactLink = screen.getByText(/Contact/i);
    expect(contactLink.closest('a')).toHaveAttribute('href', '#contact');
  });
});
