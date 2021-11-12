import React from 'react';
// import {shallow} from 'enzyme';
import { render, screen } from '@testing-library/react';
import MyReportPage from './MyReportPage';

test('renders MyReport page', () => {
  render(<MyReportPage />);
  const linkElement = screen.getByText(/MyReportPage/);
  expect(linkElement).toBeInTheDocument();
});