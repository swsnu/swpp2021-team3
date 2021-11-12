import React from 'react';
// import {shallow} from 'enzyme';
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

test('renders Login page', () => {
  render(<LoginPage />);
  const linkElement = screen.getByText(/LoginPage/);
  expect(linkElement).toBeInTheDocument();
});