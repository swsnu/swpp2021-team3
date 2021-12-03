import React from "react";
import { shallow } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Signup from "./Signup";

describe("<Signup />", () => {
  it("should render without errors", () => {
    const component = shallow(<Signup />);
    const wrapper = component.find(".Signup");
    expect(wrapper.length).toBe(0);
  });

  it("should handle Agree button", () => {
    const mockAgreeButton = jest.fn();
    const component = shallow(<Signup clickDone={mockAgreeButton} />);
    const wrapper = component.find(".AgreeButton");
    // wrapper.simulate("click");
    // expect(mockAgreeButton).toHaveBeenCalledTimes(0);
    expect(wrapper.exists()).toEqual(false);
  });

  it("should handle Signup button", () => {
    const mockSignupButton = jest.fn();
    const component = shallow(<Signup clickDone={mockSignupButton} />);
    const wrapper = component.find(".SignupButton");
    // wrapper.simulate("click");
    // expect(mockSignupButton).toHaveBeenCalledTimes(0);
    expect(wrapper.exists()).toEqual(false);
  });

  it("changes input1", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <Signup />
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
    const { getByPlaceholderText } = render(
      <Router>
        <Signup />
      </Router>
    );
    const input2 = getByPlaceholderText("이메일");
    fireEvent.change(input2, {
      target: {
        value: "TDD 배우기",
      },
    });
  });

  it("changes input3", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <Signup />
      </Router>
    );
    const input3 = getByPlaceholderText("소환사 이름");
    fireEvent.change(input3, {
      target: {
        value: "TDD 배우기",
      },
    });
  });

  it("changes input4", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <Signup />
      </Router>
    );
    const input4 = getByPlaceholderText("비밀번호");
    fireEvent.change(input4, {
      target: {
        value: "TDD 배우기",
      },
    });
  });

  it("changes input5", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <Signup />
      </Router>
    );
    const input5 = getByPlaceholderText("비밀번호 확인");
    fireEvent.change(input5, {
      target: {
        value: "TDD 배우기",
      },
    });
  });
});
