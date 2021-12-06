import React from "react";
import { shallow } from "enzyme";
// import { render, fireEvent } from "@testing-library/react";
// import { BrowserRouter as Router } from "react-router-dom";

import DetailReportedLog from "./DetailReportedLog";

describe("<DetailReportedLog />", () => {
  it("should render without errors", () => {
    const component = shallow(<DetailReportedLog />);
    const wrapper = component.find(".DetailReportedLog");
    expect(wrapper.length).toBe(1);
  });
});
