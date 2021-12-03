import React from "react";
import { shallow } from "enzyme";
import SearchPage from "./SearchPage";

describe("<SearchPage />", () => {
  it("should render without errors", () => {
    const component = shallow(<SearchPage />);
    const wrapper = component.find(".Search");
    expect(wrapper.length).toBe(0); //?
  });

  xit("should handle go report button", () => {
    const mockGoToReport = jest.fn();
    const component = shallow(<SearchPage clickDone={mockGoToReport} />);
    const wrapper = component.find(".GoToReport");
    wrapper.simulate("click");
    expect(mockGoToReport).toHaveBeenCalledTimes(0);
  });
});
