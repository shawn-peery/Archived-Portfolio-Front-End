import React from 'react';
import { getByRole, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopNavBar from './Top-Nav-Bar';
import { profile } from 'console';

describe('<TopNavBar />', () => {
  it('should mount', () => {
    render(<TopNavBar />);

    const topNavBar = screen.getByRole('navigation');
    expect(topNavBar).toBeInTheDocument();
  });

  it('should show a home link with correct href', () => {
    render(<TopNavBar />);

    const homeLink = screen.getByRole('link', { name: /home/i });

    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should show a profile link with correct href', () => {
    render(<TopNavBar />);

    const profileLink = screen.getByRole('link', { name: /profile/i });

    expect(profileLink).toHaveAttribute('href', '/profile');
  });
});
