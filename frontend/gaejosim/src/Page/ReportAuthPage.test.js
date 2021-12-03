// import React from "react";
// // import {shallow} from 'enzyme';
// import { render, screen } from "@testing-library/react";
// import ReportAuthPage from "./ReportAuthPage";

// test("renders ReportAuth page", () => {
//   render(<ReportAuthPage />);
//   const linkElement = screen.getByText(/Report/);
//   expect(linkElement).toBeInTheDocument();
// });

import React from "react";
import ReactDom from "react-dom";
import ReportAuthPage from "./ReportAuthPage";
import { BrowserRouter } from "react-router-dom";

it("renders ReportAuthPage without crashing", () => {
  const div = document.createElement("div");

  ReactDom.render(
    <BrowserRouter>
      <ReportAuthPage />
    </BrowserRouter>,
    div
  );

  ReactDom.unmountComponentAtNode(div);
});
