import React from "react";
import { shallow } from "enzyme";
import { render, screen } from "@testing-library/react";
import ChangePasswordPage from "./ChangePasswordPage";

describe("<ChangePasswordPage />", () => {
  it("should render without errors", () => {
    const component = shallow(<ChangePasswordPage />);
    const wrapper = component.find(".ChangePasswordPage");
    expect(wrapper.length).toBe(1);
  });
});
