import React from 'react';
// import {shallow} from 'enzyme';
import { render, screen } from '@testing-library/react';
import SingleSearchResultPage from './SingleSearchResultPage';

test('renders SingleSearchResult page', () => {
  render(<SingleSearchResultPage />);
  const linkElement = screen.getByText(/SingleSearchResultPage/);
  expect(linkElement).toBeInTheDocument();
});