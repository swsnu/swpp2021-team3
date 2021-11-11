import { render, screen } from '@testing-library/react';

import App from './App';
import FindUserInfoPage from './Page/FindUserInfoPage';
import LoginPage from './Page/LoginPage';
import MultiSearchResultPage from './Page/MultiSearchResultPage';
import MyPage from './Page/MyPage';
import MyReportPage from './Page/MyReportPage';
import ReportAuthPage from './Page/ReportAuthPage';
import ReportActionPage from './Page/ReportActionPage';
import SearchPage from './Page/SearchPage';
import SignupPage from './Page/SignupPage';
import SingleSearchResultPage from './Page/SingleSearchResultPage';

test('renders finduserinfo page', () => {
  render(<FindUserInfoPage />);
  const linkElement = screen.getByText(/FindUserInfoPage/);
  expect(linkElement).toBeInTheDocument();
});

test('renders login page', () => {
  render(<LoginPage />);
  const linkElement = screen.getByText(/LoginPage/);
  expect(linkElement).toBeInTheDocument();
});

test('renders multisearchresult page', () => {
  render(<MultiSearchResultPage />);
  const linkElement = screen.getByText(/Multi/);
  expect(linkElement).toBeInTheDocument();
});

test('renders my page', () => {
  render(<MyPage />);
  const linkElement = screen.getByText(/MyPage/);
  expect(linkElement).toBeInTheDocument();
});

test('renders my report page', () => {
  render(<MyReportPage />);
  const linkElement = screen.getByText(/MyReportPage/);
  expect(linkElement).toBeInTheDocument();
});

test('renders report auth page', () => {
  render(<ReportAuthPage />);
  const linkElement = screen.getByText(/Report/);
  expect(linkElement).toBeInTheDocument();
});

test('renders report action page', () => {
  render(<ReportActionPage />);
  const linkElement = screen.getByText(/Report/);
  expect(linkElement).toBeInTheDocument();
});

test('renders search page', () => {
  render(<SearchPage />);
  const linkElement = screen.getByText(/SearchPage/);
  expect(linkElement).toBeInTheDocument();
});

test('renders signup page', () => {
  render(<SignupPage />);
  const linkElement = screen.getByText(/SignupPage/);
  expect(linkElement).toBeInTheDocument();
});

test('renders singlesearchresult page', () => {
  render(<SingleSearchResultPage />);
  const linkElement = screen.getByText(/SingleSearchResultPage/);
  expect(linkElement).toBeInTheDocument();
});