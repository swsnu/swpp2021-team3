import React from "react";
import { shallow } from "enzyme";
import My from "./My";

describe("<My />", () => {
  it("should render without errors", () => {
    const component = shallow(<My />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });
});
