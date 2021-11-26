import React from "react";
// import {shallow} from 'enzyme';
import { render, screen } from "@testing-library/react";
import MultiSearchResultPage from "./MultiSearchResultPage";

xit("renders MultiSearchResult page", () => {
  render(<MultiSearchResultPage />);
  const linkElement = screen.getByText(/MultiSearchResultPage/);
  expect(linkElement).toBeInTheDocument();
}); //params
