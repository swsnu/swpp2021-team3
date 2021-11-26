import React from "react";
import { shallow } from "enzyme";
import FindUserInfoPage from "./FindUserInfoPage";

describe("<FindUserInfoPage />", () => {
  it("should render without errors", () => {
    const component = shallow(<FindUserInfoPage />);
    const wrapper = component.find(".FindUserInfoPage");
    expect(wrapper.length).toBe(1);
  });
});
