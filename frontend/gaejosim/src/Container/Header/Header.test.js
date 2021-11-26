import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { shallow } from "enzyme";
import Header from "./Header";
import LoginPage from "../../Page/LoginPage";
import MyPage from "../../Page/MyPage";

describe("<Header />", () => {
  it("should render without errors", () => {
    const component = shallow(<Header />);
    const wrapper = component.find(".Header");
    expect(wrapper.length).toBe(1);
  });

  it("should change clickLogin state", () => {
    const component = shallow(<Header />);
    component.setState({ clickLogin: true });
    expect(component.length).toBe(1);
  });

  it("should change clickMyPage state", () => {
    const component = shallow(<Header />);
    component.setState({ clickMyPage: true });
    expect(component.length).toBe(1);
  });
});

describe("router login page", () => {
  test("should pass", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getAllByText } = render(
      <Router history={history}>
        <LoginPage />
      </Router>
    );
    expect(history.location.pathname).toBe("/");
    fireEvent.click(getAllByText("로그인")[0]);
    expect(history.location.pathname).toBe("/login");
  });
});

describe("router login page2", () => {
  test("should pass", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getAllByText } = render(
      <Router history={history}>
        <LoginPage />
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
        <MyPage />
      </Router>
    );
    expect(history.location.pathname).toBe("/");
    fireEvent.click(getByText("마이페이지"));
    expect(history.location.pathname).toBe("/");
  });
});
