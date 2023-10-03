import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestComp from './TestComp';

describe('<TestComp />', () => {
  test('it should render', () => {
    render(<TestComp />);
    // Tests Here
  });
});
