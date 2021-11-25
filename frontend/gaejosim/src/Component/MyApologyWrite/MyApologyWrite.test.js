import React from "react";
import { shallow } from "enzyme";
import MyApologyWrite from "./MyApologyWrite";

describe("<MyApologyWrite />", () => {
  it("should render without errors", () => {
    const component = shallow(<MyApologyWrite />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });

  it("should handle apology_check_completed_button button", () => {
    const mock_apology_write_completed_button = jest.fn();
    const component = shallow(
      <MyApologyWrite clickDone={mock_apology_write_completed_button} />
    );
    const wrapper = component.find(".Apology_write_completed_button");
    wrapper.simulate("click");
    expect(mock_apology_write_completed_button).toHaveBeenCalledTimes(0);
  });
});
