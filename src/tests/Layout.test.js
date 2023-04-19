import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'components/Layout';

describe('Layout component tests', () => {
  test('Layout should be rendered correctly', () => {
    render(<Layout />, { wrapper: BrowserRouter });
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  test('Layout should render the <Navbar /> as its child', () => {
    render(<Layout />, { wrapper: BrowserRouter });
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });
});
