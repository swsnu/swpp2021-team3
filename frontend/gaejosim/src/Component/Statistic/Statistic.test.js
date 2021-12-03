import React from "react";
import { shallow } from "enzyme";
import Statistic from "./Statistic";
import { render, screen } from "@testing-library/react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from "./../../Store/Reducers/UserReducer";

const rootReducer = combineReducers({
  userR: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("<Statistic />", () => {
  it("should render without errors", () => {
    const component = shallow(
      <Provider store={store}>
        <Statistic />
      </Provider>
    );
    const wrapper = component.find(".Statistic");
    expect(wrapper.length).toBe(0);
  });

  it("renders Statistic page", () => {
    const component = shallow(
      <Provider store={store}>
        <Statistic />
      </Provider>
    );
    const wrapper = component.find(".TodayReports");
    expect(wrapper.length).toBe(0);
  });

  it("should render states without errors.", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Statistic />
      </Provider>
    );
    expect(wrapper.find(".numReports").length).toEqual(0);
  });
});
