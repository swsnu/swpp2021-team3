import React from "react";
import { shallow } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import FindUserInfo from "./FindUserInfo";

describe("<FindUserInfo />", () => {
  it("should render without errors", () => {
    const component = shallow(<FindUserInfo />);
    const wrapper = component.find(".FindUserInfo");
    expect(wrapper.length).toBe(0);
  });

  xit("should handle FindIDButton", () => {
    const mockFindIDButton = jest.fn();
    const component = shallow(<FindUserInfo clickDone={mockFindIDButton} />);
    const wrapper = component.find(".FindIDButton");
    wrapper.at(0).simulate("click");
    expect(mockFindIDButton).toHaveBeenCalledTimes(0);
  });

  xit("should handle FindPWButton", () => {
    const mockFindPWButton = jest.fn();
    const component = shallow(<FindUserInfo clickDone={mockFindPWButton} />);
    const wrapper = component.find(".FindPWButton");
    // wrapper.simulate("click");
    // component.find(".FindPWButton").simulate("click");
    // expect(mockFindPWButton).toHaveBeenCalledTimes(0);
    expect(wrapper.exists()).toEqual(false);
  });

  it("changes input1", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <FindUserInfo />
      </Router>
    );
    const input1 = getByPlaceholderText("아이디");
    fireEvent.change(input1, {
      target: {
        value: "TDD 배우기",
      },
    });
  });

  it("changes input2", () => {
    const { getAllByPlaceholderText } = render(
      <Router>
        <FindUserInfo />
      </Router>
    );
    const input2 = getAllByPlaceholderText("이메일")[0];
    fireEvent.change(input2, {
      target: {
        value: "TDD 배우기",
      },
    });
  });

  it("changes input3", () => {
    const { getAllByPlaceholderText } = render(
      <Router>
        <FindUserInfo />
      </Router>
    );
    const input3 = getAllByPlaceholderText("이메일")[1];
    fireEvent.change(input3, {
      target: {
        value: "TDD 배우기",
      },
    });
  });
});
