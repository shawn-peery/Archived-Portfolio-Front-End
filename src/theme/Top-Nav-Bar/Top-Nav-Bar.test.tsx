import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopNavBar from './Top-Nav-Bar';
import { profile } from 'console';

describe('<TopNavBar />', () => {
  it('should mount', () => {
    render(<TopNavBar />);

    const topNavBar = screen.getByTestId('TopNavBar');
    expect(topNavBar).toBeInTheDocument();
  });

  it('should show a home link with correct href', () => {
    render(<TopNavBar />);

    const homeLink = screen.getByRole('link');

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveTextContent(/home/i);
  });

  it('should show a profile link with correct href', () => {
    render(<TopNavBar />);

    const profileLink = screen.getByRole('link');

    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveTextContent(/profile/i);
  });
});
