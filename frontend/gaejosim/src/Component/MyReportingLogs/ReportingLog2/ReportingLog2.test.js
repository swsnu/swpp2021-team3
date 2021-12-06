import React from "react";
import { shallow } from "enzyme";
// import { render, fireEvent } from "@testing-library/react";
// import { BrowserRouter as Router } from "react-router-dom";

import ReportingLog2 from "./ReportingLog2";

describe("<ReportingLog2 />", () => {
  it("should render without errors", () => {
    const component = shallow(<ReportingLog2 />);
    const wrapper = component.find(".ReportingLog2");
    expect(wrapper.length).toBe(1);
  });
});
