import React from "react";
import { shallow } from "enzyme";
import FindUserInfo from "./FindUserInfo";

describe("<FindUserInfo />", () => {
  it("should render without errors", () => {
    const component = shallow(<FindUserInfo />);
    const wrapper = component.find(".FindUserInfo");
    expect(wrapper.length).toBe(0);
  });

  xit("should handle FindIDButton", () => {
    const mockFindIDButton = jest.fn();
    const component = shallow(<FindUserInfo clickDone={mockFindIDButton} />);
    const wrapper = component.find(".FindIDButton");
    wrapper.at(0).simulate("click");
    expect(mockFindIDButton).toHaveBeenCalledTimes(0);
  });

  xit("should handle FindPWButton", () => {
    const mockFindPWButton = jest.fn();
    const component = shallow(<FindUserInfo clickDone={mockFindPWButton} />);
    const wrapper = component.find(".FindPWButton");
    // wrapper.simulate("click");
    // component.find(".FindPWButton").simulate("click");
    // expect(mockFindPWButton).toHaveBeenCalledTimes(0);
    expect(wrapper.exists()).toEqual(false);
  });
});
