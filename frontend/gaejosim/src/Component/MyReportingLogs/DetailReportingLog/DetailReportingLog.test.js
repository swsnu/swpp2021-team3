import React from "react";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { fireEvent, render } from "@testing-library/react";

import DetailReportingLog from "./DetailReportingLog";
import MyApologyCheckPage from './../../../Page/MyApologyCheckPage'

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from './../../../Store/Reducers/UserReducer'

const rootReducer = combineReducers({
  userR: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("<DetailReportingLog />", () => {
  xit("should render without errors", () => {
    const component = mount(<Router><Provider store={store}><DetailReportingLog /></Provider></Router>);
    const wrapper = component.find(".DetailReportingLog");
    expect(wrapper.length).toBe(1);
  });

  it("should handle Paper Button", () => {
    const mockDetailReportingLog_Paper = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <DetailReportingLog clickDone={mockDetailReportingLog_Paper} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".DetailReportingLog_Paper");
    wrapper.simulate("click");
    expect(mockDetailReportingLog_Paper).toHaveBeenCalledTimes(0);
  });

  it("should handle Delete Button", () => {
    const mockDetailReportingLog_Delete = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <DetailReportingLog clickDone={mockDetailReportingLog_Delete} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".DetailReportingLog_Delete");
    wrapper.simulate("click");
    expect(mockDetailReportingLog_Delete).toHaveBeenCalledTimes(0);
  });

  xit("router apology check should pass", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByText } = render(
      <Router history={history}>
        <Provider store={store}>
          <MyApologyCheckPage />
        </Provider>
      </Router>
    );
    expect(history.location.pathname).toBe("/");
    fireEvent.click(getByText("로그인"));
    expect(history.location.pathname).toBe("/");
  });
});
