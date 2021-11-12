import React from 'react';
// import {shallow} from 'enzyme';
import { render, screen } from '@testing-library/react';
import ReportAuthPage from './ReportAuthPage';

test('renders ReportAuth page', () => {
  render(<ReportAuthPage />);
  const linkElement = screen.getByText(/Report/);
  expect(linkElement).toBeInTheDocument();
});