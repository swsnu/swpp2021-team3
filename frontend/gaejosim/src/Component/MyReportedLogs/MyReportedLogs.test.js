import React from "react";
import { shallow } from "enzyme";
import MyReportedLogs from "./MyReportedLogs";

describe("<MyReportedLogs />", () => {
  it("should render without errors", () => {
    const component = shallow(<MyReportedLogs />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });
});
