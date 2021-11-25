import React from "react";
import { shallow } from "enzyme";
import MyApologyCheck from "./MyApologyCheck";

describe("<MyApologyCheck />", () => {
  it("should render without errors", () => {
    const component = shallow(<MyApologyCheck />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });

  it("should handle apology_check_completed_button button", () => {
    const mock_apology_check_completed_button = jest.fn();
    const component = shallow(
      <MyApologyCheck clickDone={mock_apology_check_completed_button} />
    );
    const wrapper = component.find(".Apology_check_completed_button");
    wrapper.simulate("click");
    expect(mock_apology_check_completed_button).toHaveBeenCalledTimes(0);
  });
});
