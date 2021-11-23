import React from "react";
import { shallow } from "enzyme";
import MyReportedLogsPage from "./MyReportedLogsPage";

describe("<MyReportedLogsPage />", () => {
  it("should render without errors", () => {
    const component = shallow(<MyReportedLogsPage />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });
});
