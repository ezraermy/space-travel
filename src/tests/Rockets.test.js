import React from 'react';
import Rockets from 'components/Rockets';
import { renderWithProviders } from './testUtils';
import { waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const response = [
  {
    flickr_images: [
      'https://imgur.com/DaCfMsj.jpg',
      'https://imgur.com/azYafd8.jpg',
    ],
    name: 'Falcon 1',
    type: 'rocket',
    description:
      'The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.',
    id: '5e9d0d95eda69955f709d1eb',
  },
];

export const handlers = [
  rest.get(`https://api.spacexdata.com/v3/rockets`, (req, res, ctx) => {
    return res(ctx.json(response), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);
// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

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
    await userEvent.click(screen.getByText('Reserve Rocket'));
    expect(screen.getByRole('button')).toHaveTextContent('Cancel Reservation');
    expect(store.getState().rockets.items[0].reserved).toBeTruthy();
    await userEvent.click(screen.getByText('Cancel Reservation'));
    expect(screen.getByRole('button')).toHaveTextContent('Reserve Rocket');
    expect(store.getState().rockets.items[0].reserved).toBeFalsy();
  });
});
