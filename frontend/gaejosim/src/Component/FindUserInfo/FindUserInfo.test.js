import React from "react";
import { shallow, mount } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import FindUserInfo from "./FindUserInfo";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from "./../../Store/Reducers/UserReducer";

const rootReducer = combineReducers({
  userR: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("<FindUserInfo />", () => {
  it("should render without errors", () => {
    const component = mount(
      <Router>
        <Provider store={store}>
          <FindUserInfo />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".FindUserInfo");
    expect(wrapper.length).toBe(0);
  });

  it("should handle FindIDButton", () => {
    const mockFindIDButton = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <FindUserInfo clickDone={mockFindIDButton} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".FindIDButton");
    wrapper.simulate("click");
    expect(mockFindIDButton).toHaveBeenCalledTimes(0);
  });
  it("should handle FindPWButton", () => {
    const mockFindPWButton = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <FindUserInfo clickDone={mockFindPWButton} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".FindPWButton");
    wrapper.simulate("click");
    expect(mockFindPWButton).toHaveBeenCalledTimes(0);
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

//todo: axios post, onClickFindIDButton, onClickFindPWButton
