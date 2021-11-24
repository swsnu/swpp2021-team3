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
});

describe("router login page", () => {
  test("should pass", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByText } = render(
      <Router history={history}>
        <LoginPage />
      </Router>
    );
    expect(history.location.pathname).toBe("/");
    fireEvent.click(getByText("Login"));
    expect(history.location.pathname).toBe("/login");
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
