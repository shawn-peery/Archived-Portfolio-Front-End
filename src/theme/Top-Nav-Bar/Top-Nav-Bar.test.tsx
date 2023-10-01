import React from 'react';
import { render, screen } from '@testing-library/react';
import TopNavBar from './Top-Nav-Bar';

describe('<TopNavBar />', () => {
  test('it should mount', () => {
    render(<TopNavBar />);

    const topNavBar = screen.getByTestId('TopNavBar');

    expect(topNavBar).toBeInTheDocument();
  });
});
