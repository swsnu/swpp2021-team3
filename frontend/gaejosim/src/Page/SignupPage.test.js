import React from 'react';
// import {shallow} from 'enzyme';
import { render, screen } from '@testing-library/react';
import SignupPage from './SignupPage';

test('renders signup page', () => {
  render(<SignupPage />);
  const linkElement = screen.getByText(/SignupPage/);
  expect(linkElement).toBeInTheDocument();
});