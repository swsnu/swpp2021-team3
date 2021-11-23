import React from "react";
import { shallow } from "enzyme";
import MyApologyCheckPage from "./MyApologyCheckPage";

describe("<MyApologyCheckPage />", () => {
  it("should render without errors", () => {
    const component = shallow(<MyApologyCheckPage />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });
});
