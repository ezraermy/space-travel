import React from 'react';
import Rockets from 'components/Rockets';
import { renderWithProviders } from './testUtils';
import { act, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Tests for rockets component', () => {
  test('should fetch the rockets correctly', async () => {
    const screen = renderWithProviders(<Rockets />);
    const { store } = screen;
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    expect(screen.getByTestId('rocket')).toBeInTheDocument();
    expect(store.getState().rockets.items.length).toBe(1);
  });

  test('should reserve and remove reserved rocket when button is clicked', async () => {
    const screen = renderWithProviders(<Rockets />);
    const { store } = screen;
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    await act(async () => {
      await userEvent.click(screen.getByText('Reserve Rocket'));
    });
    expect(screen.getByRole('button')).toHaveTextContent('Cancel Reservation');
    expect(store.getState().rockets.items[0].reserved).toBeTruthy();
    await act(async () => {
      await userEvent.click(screen.getByText('Cancel Reservation'));
    });
    expect(screen.getByRole('button')).toHaveTextContent('Reserve Rocket');
    expect(store.getState().rockets.items[0].reserved).toBeFalsy();
  });
});
