import React from "react";
import { shallow } from "enzyme";
// import { render, fireEvent } from "@testing-library/react";
// import { BrowserRouter as Router } from "react-router-dom";

import ReportedLog2 from "./ReportedLog2";

describe("<ReportedLog2 />", () => {
  it("should render without errors", () => {
    const component = shallow(<ReportedLog2 />);
    const wrapper = component.find(".ReportedLog2");
    expect(wrapper.length).toBe(0);
  });
});
