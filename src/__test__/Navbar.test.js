import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from 'components/Navbar';

describe('Navbar', () => {
  test('renders the logo and links', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const logo = getByAltText(/logo/);
    expect(logo).toBeInTheDocument();

    const rocketsLink = getByText(/rockets/i);
    expect(rocketsLink).toBeInTheDocument();

    const missionsLink = getByText(/missions/i);
    expect(missionsLink).toBeInTheDocument();

    const profileLink = getByText(/my profile/i);
    expect(profileLink).toBeInTheDocument();
  });
});
