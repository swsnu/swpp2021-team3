import React from "react";
import { shallow } from "enzyme";
// import { render, fireEvent } from "@testing-library/react";
// import { BrowserRouter as Router } from "react-router-dom";

import ReportingLog from "./ReportingLog";

describe("<ReportingLog />", () => {
  it("should render without errors", () => {
    const component = shallow(<ReportingLog />);
    const wrapper = component.find(".ReportingLog");
    expect(wrapper.length).toBe(1);
  });
});
