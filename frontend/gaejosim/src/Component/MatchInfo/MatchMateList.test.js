import React from "react";
import { shallow } from "enzyme";
import MatchMateList from "./MatchMateList";

describe("<MatchMateList />", () => {
  xit("should render without errors", () => {
    const component = shallow(<MatchMateList />);
    const wrapper = component.find(".MatchMateList");
    expect(wrapper.length).toBe(1);
  }); // map error
});
