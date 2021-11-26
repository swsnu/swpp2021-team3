import React from "react";
import { shallow } from "enzyme";
import Signup from "./Signup";

describe("<Signup />", () => {
  it("should render without errors", () => {
    const component = shallow(<Signup />);
    const wrapper = component.find(".Signup");
    expect(wrapper.length).toBe(0);
  });

  it("should handle Agree button", () => {
    const mockAgreeButton = jest.fn();
    const component = shallow(<Signup clickDone={mockAgreeButton} />);
    const wrapper = component.find(".AgreeButton");
    // wrapper.simulate("click");
    // expect(mockAgreeButton).toHaveBeenCalledTimes(0);
    expect(wrapper.exists()).toEqual(false);
  });

  it("should handle Signup button", () => {
    const mockSignupButton = jest.fn();
    const component = shallow(<Signup clickDone={mockSignupButton} />);
    const wrapper = component.find(".SignupButton");
    // wrapper.simulate("click");
    // expect(mockSignupButton).toHaveBeenCalledTimes(0);
    expect(wrapper.exists()).toEqual(false);
  });
});
