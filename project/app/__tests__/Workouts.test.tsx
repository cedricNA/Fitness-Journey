import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Workouts from '../(tabs)/workouts';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() })
}));

jest.mock('@/context/ThemeContext', () => {
  const React = require('react');
  return {
    ThemeProvider: ({ children }: any) => <>{children}</>,
    useTheme: () => ({
      colors: {
        background: '#fff',
        card: '#fff',
        text: '#000',
        textSecondary: '#888',
        border: '#ccc',
        secondary: '#eee'
      }
    })
  };
});

jest.mock('@/storage', () => ({
  getWorkouts: jest.fn(() => Promise.resolve([])),
  saveWorkouts: jest.fn()
}));

describe('Workouts screen', () => {
  it('changes category when a tab is pressed', async () => {
    const { getByText } = render(<Workouts />);

    fireEvent.press(getByText('Cardio'));

    await waitFor(() => {
      expect(getByText('Recommandés pour vous • Cardio')).toBeTruthy();
    });
  });
});
