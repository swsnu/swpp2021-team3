import React from "react";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { fireEvent, render } from "@testing-library/react";

import DetailReportedLog from "./DetailReportedLog";
import MyApologyWritePage from './../../../Page/MyApologyWritePage'

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from './../../../Store/Reducers/UserReducer'

const rootReducer = combineReducers({
  userR: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("<DetailReportedLog />", () => {
  it("should render without errors", () => {
    const component = mount(<Router><Provider store={store}><DetailReportedLog /></Provider></Router>);
    const wrapper = component.find(".DetailReportedLog");
    expect(wrapper.length).toBe(1);
  });

  it("should handle Pencil Button", () => {
    const mockDetailReportedLog_Pencil = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <DetailReportedLog clickDone={mockDetailReportedLog_Pencil} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".DetailReportedLog_Pencil");
    wrapper.simulate("click");
    expect(mockDetailReportedLog_Pencil).toHaveBeenCalledTimes(0);
  });

  it("router apology write should pass", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByText } = render(
      <Router history={history}>
        <Provider store={store}>
          <MyApologyWritePage />
        </Provider>
      </Router>
    );
    expect(history.location.pathname).toBe("/");
    fireEvent.click(getByText("로그인"));
    expect(history.location.pathname).toBe("/");
  });
});
