import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Progress from '../(tabs)/progress';

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
  getWeights: jest.fn(() => Promise.resolve([
    { date: '2024-01-01', value: 70 },
    { date: '2024-01-02', value: 69 }
  ])),
}));

describe('Progress screen', () => {
  it('switches tabs', async () => {
    const { getByText } = render(<Progress />);

    await waitFor(() => {
      expect(getByText('Évolution du poids')).toBeTruthy();
    });

    fireEvent.press(getByText('Mensurations'));

    await waitFor(() => {
      expect(getByText('Évolution des mensurations')).toBeTruthy();
    });
  });
});
