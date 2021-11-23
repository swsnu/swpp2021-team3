import React from "react";
import { shallow } from "enzyme";
import MyApologyWrite from "./MyApologyWrite";

describe("<MyApologyWrite />", () => {
  it("should render without errors", () => {
    const component = shallow(<MyApologyWrite />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });
});
