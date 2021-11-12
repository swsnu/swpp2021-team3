import React from 'react';
// import {shallow} from 'enzyme';
import { render, screen } from '@testing-library/react';
import FindUserInfoPage from './FindUserInfoPage';

test('renders FindUserInfo page', () => {
  render(<FindUserInfoPage />);
  const linkElement = screen.getByText(/FindUserInfoPage/);
  expect(linkElement).toBeInTheDocument();
});