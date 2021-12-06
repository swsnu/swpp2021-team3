import React from "react";
import { shallow, mount } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import ChangePassword from "./ChangePassword";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from "./../../Store/Reducers/UserReducer";

const rootReducer = combineReducers({
  userR: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("<ChangePassword />", () => {
  it("should render without errors", () => {
    const component = shallow(<ChangePassword />);
    const wrapper = component.find(".ChangePassword");
    expect(wrapper.length).toBe(0);
  });

  it("should handle ChangePWButton", () => {
    const mockChangePWButton = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <ChangePassword clickDone={mockChangePWButton} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".ChangePWButton");
    wrapper.simulate("click");
    expect(mockChangePWButton).toHaveBeenCalledTimes(0);
    // expect(wrapper.exists()).toEqual(false);
  });

  it("changes input1", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <ChangePassword />
      </Router>
    );
    const input1 = getByPlaceholderText("기존 비밀번호");
    fireEvent.change(input1, {
      target: {
        value: "TDD 배우기",
      },
    });
  });

  it("changes input2", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <ChangePassword />
      </Router>
    );
    const input2 = getByPlaceholderText("신규 비밀번호");
    fireEvent.change(input2, {
      target: {
        value: "TDD 배우기",
      },
    });
  });

  it("changes input3", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <ChangePassword />
      </Router>
    );
    const input3 = getByPlaceholderText("신규 비밀번호 확인");
    fireEvent.change(input3, {
      target: {
        value: "TDD 배우기",
      },
    });
  });
});

//todo: axios put test code
