import React from "react";
import { shallow } from "enzyme";
import MyPage from "./MyPage";

describe("<MyPage />", () => {
  it("should render without errors", () => {
    const component = shallow(<MyPage />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });
});
