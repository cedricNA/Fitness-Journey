import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

const mockToggleTheme = jest.fn();
const pushMock = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: jest.fn()
}));

jest.mock('@/context/ThemeContext', () => {
  const React = require('react');
  const value = {
    theme: 'light',
    colors: {
      background: '#fff',
      card: '#fff',
      text: '#000',
      textSecondary: '#888',
      border: '#ccc',
      secondary: '#eee'
    },
    toggleTheme: mockToggleTheme
  };
  return {
    ThemeProvider: ({ children }: any) => <>{children}</>,
    useTheme: () => value
  };
});

jest.mock('@/context/UserContext', () => {
  const React = require('react');
  return {
    UserProvider: ({ children }: any) => <>{children}</>,
    useUser: () => ({ user: { name: 'John Doe', goal: 'weight_loss' }, setUser: jest.fn() })
  };
});

// Import the component after mocks so they take effect
import Dashboard from '../(tabs)/index';
import { useRouter } from 'expo-router';
(useRouter as jest.Mock).mockReturnValue({ push: pushMock });

describe('Dashboard screen', () => {
  it('renders welcome text and triggers quick action', () => {
    const { getByText, getByTestId } = render(<Dashboard />);

    expect(getByText(/Bonjour/)).toBeTruthy();

    fireEvent.press(getByText('Ajouter un repas'));
    expect(pushMock).toHaveBeenCalledWith('/meals');
  });
});
