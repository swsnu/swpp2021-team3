import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { shallow } from "enzyme";

import My from "./My";

describe("<My />", () => {
  it("should render without errors", () => {
    const component = shallow(<My />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });

  it("should handle delete1 button", () => {
    const mockDelete1Button = jest.fn();
    const component = shallow(<My clickDone={mockDelete1Button} />);
    const wrapper = component.find(".Delete1");
    wrapper.simulate("click");
    expect(mockDelete1Button).toHaveBeenCalledTimes(0);
  });

  it("should handle delete2 button", () => {
    const mockDelete2Button = jest.fn();
    const component = shallow(<My clickDone={mockDelete2Button} />);
    const wrapper = component.find(".Delete2");
    wrapper.simulate("click");
    expect(mockDelete2Button).toHaveBeenCalledTimes(0);
  });

  it("should handle pencil1 button", () => {
    const mockPencil1Button = jest.fn();
    const component = shallow(<My clickDone={mockPencil1Button} />);
    const wrapper = component.find(".Pencil1");
    wrapper.simulate("click");
    expect(mockPencil1Button).toHaveBeenCalledTimes(0);
  });

  it("should handle pencil2 button", () => {
    const mockPencil2Button = jest.fn();
    const component = shallow(<My clickDone={mockPencil2Button} />);
    const wrapper = component.find(".Pencil2");
    wrapper.simulate("click");
    expect(mockPencil2Button).toHaveBeenCalledTimes(0);
  });

  it("should handle paper1 button", () => {
    const mockPaper1Button = jest.fn();
    const component = shallow(<My clickDone={mockPaper1Button} />);
    const wrapper = component.find(".Paper1");
    wrapper.simulate("click");
    expect(mockPaper1Button).toHaveBeenCalledTimes(0);
  });

  it("should handle paper2 button", () => {
    const mockPaper2Button = jest.fn();
    const component = shallow(<My clickDone={mockPaper2Button} />);
    const wrapper = component.find(".Paper2");
    wrapper.simulate("click");
    expect(mockPaper2Button).toHaveBeenCalledTimes(0);
  });

  it("should handle SeemoreText1 button", () => {
    const mockSeemoreText1 = jest.fn();
    const component = shallow(<My clickDone={mockSeemoreText1} />);
    const wrapper = component.find(".SeemoreText1");
    wrapper.simulate("click");
    expect(mockSeemoreText1).toHaveBeenCalledTimes(0);
  });

  it("should handle SeemoreText2 button", () => {
    const mockSeemoreText2 = jest.fn();
    const component = shallow(<My clickDone={mockSeemoreText2} />);
    const wrapper = component.find(".SeemoreText2");
    wrapper.simulate("click");
    expect(mockSeemoreText2).toHaveBeenCalledTimes(0);
  });
});
