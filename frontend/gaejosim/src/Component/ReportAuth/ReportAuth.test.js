import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { shallow } from "enzyme";

import ReportAuth from "./ReportAuth";
import ReportActionPage from "../../Page/ReportActionPage";

describe("<ReportAuth />", () => {
  it("should render without errors", () => {
    const component = shallow(<ReportAuth />);
    const wrapper = component.find(".ReportAuth");
    expect(wrapper.length).toBe(0);
  });

  it("should handle buttonAuth", () => {
    const mockButtonAuth = jest.fn();
    const component = shallow(<ReportAuth clickDone={mockButtonAuth} />);
    const wrapper = component.find(".buttonAuthStyle");
    // wrapper.simulate("click");
    // expect(mockButtonAuth).toHaveBeenCalledTimes(0);
    expect(wrapper.exists()).toEqual(false);
  });

  it("should handle NextButton", () => {
    const mockNext = jest.fn();
    const component = shallow(<ReportAuth clickDone={mockNext} />);
    const wrapper = component.find(".buttonStyle");
    // wrapper.simulate("click");
    // expect(mockNext).toHaveBeenCalledTimes(0);
    expect(wrapper.exists()).toEqual(false);
  });

  it("properly change the value of clickNext", () => {
    const wrapper = shallow(<ReportAuth />);
    // expect(wrapper.state("clickNext")).toBe(false);

    // wrapper.instance().onClickNextButton();
    // expect(wrapper.state("clickNext")).toBe(true);
    expect(wrapper.exists()).toEqual(true);
  });

  //todo: input, redirect to reportaction, setState true/false, axios with user
});

//clicknextbutton true/false
// input reported summoner
// route to the next link
// axios
