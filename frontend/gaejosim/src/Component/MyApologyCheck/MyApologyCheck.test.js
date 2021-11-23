import React from "react";
import { shallow } from "enzyme";
import MyApologyCheck from "./MyApologyCheck";

describe("<MyApologyCheck />", () => {
  it("should render without errors", () => {
    const component = shallow(<MyApologyCheck />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });
});
