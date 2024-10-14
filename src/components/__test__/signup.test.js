import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '../signup';

describe('Signup Component', () => {
  beforeEach(() => {
    render(<Signup />);
  });

  test('renders signup form', () => {
    const signupHeader = screen.getByRole('heading', { name: /signup/i });
    expect(signupHeader).toBeInTheDocument();

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const signupButton = screen.getByRole('button', { name: /signup/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  test('allows user to type in username, password, confirm password, and user type', () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testPassword' } });

    expect(usernameInput.value).toBe('testUser');
    expect(passwordInput.value).toBe('testPassword');
    expect(confirmPasswordInput.value).toBe('testPassword');
  });

  test('submits the form with correct values', () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const signupButton = screen.getByRole('button', { name: /signup/i });

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testPassword' } });
    fireEvent.click(signupButton);
  });
});
