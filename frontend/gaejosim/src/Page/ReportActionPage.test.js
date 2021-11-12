import React from 'react';
// import {shallow} from 'enzyme';
import { render, screen } from '@testing-library/react';
import ReportActionPage from './ReportActionPage';

test('renders ReportAction page', () => {
  render(<ReportActionPage />);
  const linkElement = screen.getByText(/ReportActionPage/);
  expect(linkElement).toBeInTheDocument();
});