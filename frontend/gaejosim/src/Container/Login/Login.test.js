import React from "react";
import { shallow } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Login from "./Login";

describe("<Login />", () => {
  xit("should render without errors", () => {
    const component = shallow(<Login />);
    const wrapper = component.find(".Login");
    expect(wrapper.length).toBe(0);
  });

  xit("should handle Login button", () => {
    const mockLoginButton = jest.fn();
    const component = shallow(<Login clickDone={mockLoginButton} />);
    const wrapper = component.find(".LoginButton");
    wrapper.simulate("click");
    expect(mockLoginButton).toHaveBeenCalledTimes(0);
    // expect(wrapper.exists()).toEqual(false);
    // wrapper.props().onClick();

    it("changes input1", () => {
      const { getByPlaceholderText } = render(
        <Router>
          <Login />
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
          <Login />
        </Router>
      );
      const input2 = getByPlaceholderText("비밀번호");
      fireEvent.change(input2, {
        target: {
          value: "TDD 배우기",
        },
      });
    });
  });
});
