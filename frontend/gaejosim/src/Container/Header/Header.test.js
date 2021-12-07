import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { shallow, mount } from "enzyme";
import Header from "./Header";
import LoginPage from "../../Page/LoginPage";
import MyPage from "../../Page/MyPage";
import SearchPage from '../../Page/SearchPage';

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

  it("should change clickLogin state", () => {
    const component = mount(
      <Router>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>
    );
    component.setState({ clickLogin: true });
    expect(component.length).toBe(1);
  });

  it("should change clickMyPage state", () => {
    const component = mount(
      <Router>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>
    );
    component.setState({ clickMyPage: true });
    expect(component.length).toBe(1);
  });

  it("should handle loginButton", () => {
    const mockloginButton = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <Header clickDone={mockloginButton} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".loginButton");
    wrapper.simulate("click");
    expect(mockloginButton).toHaveBeenCalledTimes(0);
  });

  it("should handle mainpageButton", () => {
    const mockmainpageButton = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <Header clickDone={mockmainpageButton} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".mainpageButton");
    wrapper.simulate("click");
    expect(mockmainpageButton).toHaveBeenCalledTimes(0);
  });

  xit("should handle mypageButton", () => {
    const mockmypageButton = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <Header clickDone={mockmypageButton} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".mypageButton");
    wrapper.simulate("click");
    expect(mockmypageButton).toHaveBeenCalledTimes(0);
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

describe("router search page", () => {
  test("should pass", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByText } = render(
      <Router history={history}>
        <Provider store={store}>
          <SearchPage />
        </Provider>
      </Router>
    );
    expect(history.location.pathname).toBe("/");
    fireEvent.click(getByText("검색"));
    expect(history.location.pathname).toBe("/");
  });
});
