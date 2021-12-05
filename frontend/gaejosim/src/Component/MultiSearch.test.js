import React from "react";
import { shallow } from "enzyme";

import MultiSearch from "./MultiSearch";

describe("<MultiSearch />", () => {
  it("should render without errors", () => {
    const component = shallow(<MultiSearch />);
    const wrapper = component.find(".MultiSearch");
    expect(wrapper.length).toBe(1);
  });
});

//todo: axios get test code
