import React from "react";
import { shallow } from "enzyme";
import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";

describe("<LoginPage />", () => {
  it("should render without errors", () => {
    const component = shallow(<LoginPage />);
    const wrapper = component.find(".LoginPage");
    expect(wrapper.length).toBe(0);
  });
});
