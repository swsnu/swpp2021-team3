import React from "react";
import { shallow } from "enzyme";
import MyReportingLogs from "./MyReportingLogs";

describe("<MyReportingLogs />", () => {
  it("should render without errors", () => {
    const component = shallow(<MyReportingLogs />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });
});
