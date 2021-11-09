import { render, screen } from '@testing-library/react';
// import App from './App';
import ReportAuthPage from './Page/ReportAuthPage'

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders report auth link', () => {
  render(<ReportAuthPage />);
  const linkElement = screen.getByText(/ReportAuthPage/i);
  expect(linkElement).toBeInTheDocument();
});