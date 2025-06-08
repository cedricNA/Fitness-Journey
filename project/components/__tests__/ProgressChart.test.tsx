import React from 'react';
import { render } from '@testing-library/react-native';
import ProgressChart from '../ProgressChart';

describe('ProgressChart', () => {
  it('renders empty state', () => {
    const { getByText } = render(
      <ProgressChart data={[]} color="#000" />
    );
    expect(getByText('Aucune donnée disponible')).toBeTruthy();
  });

  it('renders data points', () => {
    const data = [
      { date: '2024-01-01', value: 10 },
      { date: '2024-01-02', value: 12 }
    ];
    const { getByText } = render(
      <ProgressChart data={data} color="#000" unit="kg" />
    );
    expect(getByText('10kg')).toBeTruthy();
    expect(getByText('12kg')).toBeTruthy();
  });
});
