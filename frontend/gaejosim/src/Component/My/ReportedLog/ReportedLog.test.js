import React from "react";
import { shallow } from "enzyme";
// import { render, fireEvent } from "@testing-library/react";
// import { BrowserRouter as Router } from "react-router-dom";

import ReportedLog from "./ReportedLog";

describe("<ReportedLog />", () => {
  it("should render without errors", () => {
    const component = shallow(<ReportedLog />);
    const wrapper = component.find(".ReportedLog");
    expect(wrapper.length).toBe(0);
  });
});
