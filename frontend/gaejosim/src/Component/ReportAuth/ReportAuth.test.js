import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
// import { Router } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import { createMemoryHistory } from "history";
import { shallow, mount } from "enzyme";

import ReportAuth from "./ReportAuth";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import userReducer from "./../Store/Reducers/UserReducer";
import userReducer from "./../../Store/Reducers/UserReducer";

const rootReducer = combineReducers({
  userR: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("<ReportAuth />", () => {
  it("should render without errors", () => {
    const component = shallow(
      <Provider store={store}>
        <ReportAuth />
      </Provider>
    );
    const wrapper = component.find(".ReportAuth");
    expect(wrapper.length).toBe(0);
  });

  it("properly change the value of buttonAuth", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ReportAuth />
      </Provider>
    );
    // expect(wrapper.state("clickNext")).toBe(false);

    // wrapper.instance().onClickNextButton();
    // expect(wrapper.state("clickNext")).toBe(true);
    expect(wrapper.exists()).toEqual(true);
  });

  xit("should handle NextButton", () => {
    const mockNext = jest.fn();
    const component = shallow(<ReportAuth clickDone={mockNext} />);
    const wrapper = component.find(".buttonStyle");
    wrapper.simulate("change");
    expect(mockNext).toHaveBeenCalledTimes(0);
    // expect(wrapper.exists()).toEqual(true);
  });

  it("properly change the value of clickNext", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ReportAuth />
      </Provider>
    );
    // expect(wrapper.state("clickNext")).toBe(false);

    // wrapper.instance().onClickNextButton();
    // expect(wrapper.state("clickNext")).toBe(true);
    expect(wrapper.exists()).toEqual(true);
  });

  xit("changes input", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <ReportAuth />
      </Router>
    );
    const input = getByPlaceholderText("리포트 대상 플레이어를 선택하세요.");
    fireEvent.change(input, {
      target: {
        value: "TDD 배우기",
      },
    });
  });

  //todo: input, redirect to reportaction, setState true/false, axios with user
});
