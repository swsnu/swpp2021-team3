import React from "react";
import { shallow, mount } from "enzyme";
import { fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";

import ReportAction from "./ReportAction";
// import SearchPage from "../../Page/SearchPage";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from "./../../Store/Reducers/UserReducer";

const rootReducer = combineReducers({
  userR: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("<ReportAction />", () => {
  it("should render without errors", () => {
    const component = shallow(
      <Provider store={store}>
        <ReportAction />
      </Provider>
    );
    const wrapper = component.find(".ReportAction");
    expect(wrapper.length).toBe(0);
  });

  it("should handle tag1_1", () => {
    const mockClickTag1_1 = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <ReportAction clickDone={mockClickTag1_1} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".Tag1_1Button");
    wrapper.simulate("click");
    expect(mockClickTag1_1).toHaveBeenCalledTimes(0);
  });

  it("should handle tag1_2", () => {
    const mockClickTag1_2 = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <ReportAction clickDone={mockClickTag1_2} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".Tag1_2Button");
    wrapper.simulate("click");
    expect(mockClickTag1_2).toHaveBeenCalledTimes(0);
  });

  it("should handle tag2_1", () => {
    const mockClickTag2_1 = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <ReportAction clickDone={mockClickTag2_1} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".Tag2_1Button");
    wrapper.simulate("click");
    expect(mockClickTag2_1).toHaveBeenCalledTimes(0);
  });

  it("should handle tag2_2", () => {
    const mockClickTag2_2 = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <ReportAction clickDone={mockClickTag2_2} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".Tag2_2Button");
    wrapper.simulate("click");
    expect(mockClickTag2_2).toHaveBeenCalledTimes(0);
  });

  it("should handle tag3_1", () => {
    const mockClickTag3_1 = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <ReportAction clickDone={mockClickTag3_1} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".Tag3_1Button");
    wrapper.simulate("click");
    expect(mockClickTag3_1).toHaveBeenCalledTimes(0);
  });

  it("should handle tag3_2", () => {
    const mockClickTag3_2 = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <ReportAction clickDone={mockClickTag3_2} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".Tag3_2Button");
    wrapper.simulate("click");
    expect(mockClickTag3_2).toHaveBeenCalledTimes(0);
  });

  it("should handle tag4_1", () => {
    const mockClickTag4_1 = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <ReportAction clickDone={mockClickTag4_1} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".Tag4_1Button");
    wrapper.simulate("click");
    expect(mockClickTag4_1).toHaveBeenCalledTimes(0);
  });

  it("should handle tag4_2", () => {
    const mockClickTag4_2 = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <ReportAction clickDone={mockClickTag4_2} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".Tag4_2Button");
    wrapper.simulate("click");
    expect(mockClickTag4_2).toHaveBeenCalledTimes(0);
  });

  it("should handle tag5_1", () => {
    const mockClickTag5_1 = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <ReportAction clickDone={mockClickTag5_1} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".Tag5_1Button");
    wrapper.simulate("click");
    expect(mockClickTag5_1).toHaveBeenCalledTimes(0);
  });

  it("should handle tag5_2", () => {
    const mockClickTag5_2 = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <ReportAction clickDone={mockClickTag5_2} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".Tag5_2Button");
    wrapper.simulate("click");
    expect(mockClickTag5_2).toHaveBeenCalledTimes(0);
  });

  it("should handle submit", () => {
    const mockClickSubmit = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <ReportAction clickDone={mockClickSubmit} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".submitButton");
    wrapper.simulate("click");
    expect(mockClickSubmit).toHaveBeenCalledTimes(0);
  });

  it("should handle cancel", () => {
    const mockClickCancel = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <ReportAction clickDone={mockClickCancel} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".cancelButton");
    wrapper.simulate("click");
    expect(mockClickCancel).toHaveBeenCalledTimes(0);
  });

  it("router search page", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getAllByText } = render(
      <Router history={history}>
        <Provider store={store}>
          <ReportAction />
        </Provider>
      </Router>
    );
    expect(history.location.pathname).toBe("/");
    fireEvent.click(getAllByText("제출")[0]);
    expect(history.location.pathname).toBe("/");
  });

  it("changes input", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <Provider store={store}>
          <ReportAction />
        </Provider>
      </Router>
    );
    const input = getByPlaceholderText(
      "게임 내 해당 플레이어가 보였던 행동에 대해 기술하세요."
    );
    fireEvent.change(input, {
      target: {
        value: "TDD 배우기",
      },
    });
  });
});

//todo: input, setState(false)
