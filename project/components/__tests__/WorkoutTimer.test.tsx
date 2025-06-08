import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WorkoutTimer from '../WorkoutTimer';

jest.useFakeTimers();

describe('WorkoutTimer', () => {
  it('handles start, pause and stop', () => {
    const onComplete = jest.fn();
    const { getByText, getByTestId } = render(
      <WorkoutTimer onComplete={onComplete} />
    );

    // initial state
    expect(getByText('Prêt')).toBeTruthy();

    // start timer
    fireEvent.press(getByTestId('start-button'));
    expect(getByText('En cours')).toBeTruthy();

    // pause timer
    fireEvent.press(getByTestId('pause-button'));
    expect(getByText('En pause')).toBeTruthy();

    // stop timer
    fireEvent.press(getByTestId('stop-button'));
    expect(onComplete).toHaveBeenCalled();
  });
});
