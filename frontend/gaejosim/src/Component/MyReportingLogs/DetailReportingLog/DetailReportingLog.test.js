import React from "react";
import { shallow } from "enzyme";
// import { render, fireEvent } from "@testing-library/react";
// import { BrowserRouter as Router } from "react-router-dom";

import DetailReportingLog from "./DetailReportingLog";

describe("<DetailReportingLog />", () => {
  it("should render without errors", () => {
    const component = shallow(<v />);
    const wrapper = component.find(".DetailReportingLog");
    expect(wrapper.length).toBe(1);
  });
});
