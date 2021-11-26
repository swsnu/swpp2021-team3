import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";

describe("<Login />", () => {
  it("should render without errors", () => {
    const component = shallow(<Login />);
    const wrapper = component.find(".Login");
    expect(wrapper.length).toBe(0);
  });

  xit("should handle Login button", () => {
    const mockLoginButton = jest.fn();
    const component = shallow(<Login clickDone={mockLoginButton} />);
    const wrapper = component.find(".LoginButton");
    wrapper.simulate("click");
    expect(mockLoginButton).toHaveBeenCalledTimes(0);
    // expect(wrapper.exists()).toEqual(false);
    // wrapper.props().onClick();
  });
});
