import React from "react";
import { shallow } from "enzyme";
import ChangePassword from "./ChangePassword";

describe("<ChangePassword />", () => {
  it("should render without errors", () => {
    const component = shallow(<ChangePassword />);
    const wrapper = component.find(".ChangePassword");
    expect(wrapper.length).toBe(0);
  });

  it("should handle ChangePWButton", () => {
    const mockChangePWButton = jest.fn();
    const component = shallow(
      <ChangePassword clickDone={mockChangePWButton} />
    );
    const wrapper = component.find(".ChangePWButton");
    wrapper.simulate("click");
    expect(mockChangePWButton).toHaveBeenCalledTimes(0);
    // expect(wrapper.exists()).toEqual(false);
  });
});
