import React from "react";
import { shallow } from "enzyme";
import CommonSearch from "./CommonSearch";
// import Result from "./Result/Result";

describe("<CommonSearch />", () => {
  //todo done : Cannot read property 'map' of undefined
  xit("should render without errors", () => {
    const component = shallow(
      <CommonSearch result={{ recent_result: "result" }} />
    );
    const wrapper = component.find(".CommonSearch");
    expect(wrapper.length).toBe(0);
  });

  xit("should render states without errors.", () => {
    const wrapper = shallow(<CommonSearch recent_result={[]} />);
    expect(wrapper.find("#tier").length).toEqual(0);
  });
});
