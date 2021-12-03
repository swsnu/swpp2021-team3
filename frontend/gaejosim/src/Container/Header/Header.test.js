import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { shallow } from "enzyme";
import Header from "./Header";
import LoginPage from "../../Page/LoginPage";
import MyPage from "../../Page/MyPage";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from "./../../Store/Reducers/UserReducer";

const rootReducer = combineReducers({
  userR: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("<Header />", () => {
  it("should render without errors", () => {
    const component = shallow(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const wrapper = component.find(".Header");
    expect(wrapper.length).toBe(0);
  });

  xit("should change clickLogin state", () => {
    const component = shallow(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    component.setState({ clickLogin: true });
    expect(component.length).toBe(1);
  });

  xit("should change clickMyPage state", () => {
    const component = shallow(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    component.setState({ clickMyPage: true });
    expect(component.length).toBe(1);
  });
});

describe("router login page", () => {
  it("should pass", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getAllByText } = render(
      <Router history={history}>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </Router>
    );
    expect(history.location.pathname).toBe("/");
    fireEvent.click(getAllByText("로그인")[0]);
    expect(history.location.pathname).toBe("/");
  });
});

describe("router login page2", () => {
  it("should pass", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getAllByText } = render(
      <Router history={history}>
        <Provider store={store}>
          <LoginPage />
        </Provider>
      </Router>
    );
    expect(history.location.pathname).toBe("/");
    fireEvent.click(getAllByText("로그인")[1]);
    expect(history.location.pathname).toBe("/");
  });
});

describe("router my page", () => {
  test("should pass", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByText } = render(
      <Router history={history}>
        <Provider store={store}>
          <MyPage />
        </Provider>
      </Router>
    );
    expect(history.location.pathname).toBe("/");
    fireEvent.click(getByText("마이페이지"));
    expect(history.location.pathname).toBe("/");
  });
});
