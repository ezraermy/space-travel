import { render, screen } from '@testing-library/react';
import Navbar from 'components/Navbar';
import { BrowserRouter } from 'react-router-dom';

describe('Navbar component tests', () => {
  test('Navbar should be rendered correctly', () => {
    render(<Navbar />, { wrapper: BrowserRouter });
    expect(screen.getByText('Space Travelers Hub')).toBeInTheDocument();
  });

  test('Navbar should contain all 3 links', () => {
    render(<Navbar />, { wrapper: BrowserRouter });
    expect(screen.getByText('Rockets')).toBeInTheDocument();
    expect(screen.getByText('Missions')).toBeInTheDocument();
    expect(screen.getByText('My Profile')).toBeInTheDocument();
  });
});
