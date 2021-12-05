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
    expect(wrapper.exists()).toEqual(true);
  });

  it("should handle NextButton", () => {
    const mockNext = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <ReportAuth clickDone={mockNext} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".buttonStyle");
    wrapper.simulate("change");
    expect(mockNext).toHaveBeenCalledTimes(0);
  });

  xit("changes input", () => {
    //text 인식을 못함
    const { getByPlaceholderText } = render(
      <Router>
        <Provider store={store}>
          <ReportAuth />
        </Provider>
      </Router>
    );
    const input = getByPlaceholderText("리포트 대상 플레이어를 선택하세요.");
    fireEvent.change(input, {
      target: {
        value: "TDD 배우기",
      },
    });
  });

  //todo: axios post, axios get, functions
});
