import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../login'; // Adjust the import path as needed

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    
    // Check if the heading is in the document
    const loginHeader = screen.getByRole('heading', { name: /login/i });
    expect(loginHeader).toBeInTheDocument();

    // Check if the input fields and button are in the document
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('allows user to type in username and password', () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Simulate user typing
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    expect(usernameInput.value).toBe('testUser');
    expect(passwordInput.value).toBe('testPassword');
  });

  test('submits the form with correct values', () => {
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

    render(<Login />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Simulate user typing
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Simulate form submission
    fireEvent.click(loginButton);

    // Check console log for username and password
    expect(consoleLogMock).toHaveBeenCalledWith('Username:', 'testUser');
    expect(consoleLogMock).toHaveBeenCalledWith('Password:', 'testPassword');

    consoleLogMock.mockRestore(); // Restore original console.log
  });
});
