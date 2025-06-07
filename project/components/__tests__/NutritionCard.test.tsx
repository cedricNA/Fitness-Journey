import React from 'react';
import { render } from '@testing-library/react-native';
import NutritionCard from '../NutritionCard';

describe('NutritionCard', () => {
  it('renders basic information', () => {
    const { getByText } = render(
      <NutritionCard name="Banane" calories={100} protein={2} carbs={20} fat={1} />
    );

    expect(getByText('Banane')).toBeTruthy();
    expect(getByText('100')).toBeTruthy();
    expect(getByText('kcal')).toBeTruthy();
  });

});
