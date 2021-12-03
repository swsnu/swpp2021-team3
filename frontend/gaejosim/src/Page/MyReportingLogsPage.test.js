import React from "react";
import { shallow } from "enzyme";
import MyReportingLogsPage from "./MyReportingLogsPage";

describe("<MyReportingLogsPage />", () => {
  it("should render without errors", () => {
    const component = shallow(<MyReportingLogsPage />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });
});
