import React from "react";
// import {shallow} from 'enzyme';
import { render, screen } from "@testing-library/react";

import ReportActionPage from "./ReportActionPage";

xtest("renders ReportAction page", () => {
  render(<ReportActionPage />);
  const linkElement = screen.getByText(/검색/);
  expect(linkElement).toBeInTheDocument();
});
