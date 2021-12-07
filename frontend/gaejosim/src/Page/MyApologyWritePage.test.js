import React from "react";
import { shallow } from "enzyme";
import MyApologyWritePage from "./MyApologyWritePage";

describe("<MyApologyWritePage />", () => {
  xit("should render without errors", () => {
    const component = shallow(<MyApologyWritePage />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });
});
