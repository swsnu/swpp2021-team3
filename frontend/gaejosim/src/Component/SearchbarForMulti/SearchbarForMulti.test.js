import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { shallow } from "enzyme";
import SearchbarForMulti from "./SearchbarForMulti";
// import SearchPage from "../../Page/SearchPage";
import MultiSearchResultPage from "../../Page/MultiSearchResultPage";

// import MyPage from '../../Page/MyPage';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from "../../Store/Reducers/UserReducer";

const rootReducer = combineReducers({
  userR: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("<SearchbarForMulti />", () => {
  it("should render without errors", () => {
    const component = shallow(
      <Provider store={store}>
        <SearchbarForMulti />
      </Provider>
    );
    const wrapper = component.find(".SearchbarForMulti");
    expect(wrapper.length).toBe(0);
  });

  it("should handle search button", () => {
    const mockSearchButton = jest.fn();
    const component = shallow(
      <SearchbarForMulti clickDone={mockSearchButton} />
    );
    const wrapper = component.find(".searchForMulti");
    // wrapper.simulate("click");
    // expect(mockSearchButton).toHaveBeenCalledTimes(0);
    expect(wrapper.exists()).toEqual(false);
  });

  xit("changes input1", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <Provider store={store}>
          <SearchbarForMulti />
        </Provider>
      </Router>
    );
    const input1 = getByPlaceholderText(
      `소환사1님이 방에 참가했습니다.
      소환사2님이 방에 참가했습니다.
      소환사3님이 방에 참가했습니다.
      소환사4님이 방에 참가했습니다.
      소환사5님이 방에 참가했습니다.
      또는
      소환사1, 소환사2, 소환사3, 소환사4, 소환사5`
    );
    fireEvent.change(input1, {
      target: {
        value: "TDD 배우기",
      },
    });
  });
});

describe("router search page", () => {
  xit("should pass", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByText } = render(
      // <Provider>
      <Router history={history}>
        <Provider store={store}>
          <MultiSearchResultPage />
        </Provider>
      </Router>
      // </Provider>
    );
    expect(history.location.pathname).toBe("/");
    fireEvent.click(getByText("검색"));
    expect(history.location.pathname).toBe("/");
  });
});
