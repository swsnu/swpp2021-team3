import React from "react";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";

import SearchPage from "./SearchPage";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from "./../Store/Reducers/UserReducer";

const rootReducer = combineReducers({
  userR: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("<SearchPage />", () => {
  it("should render without errors", () => {
    const component = shallow(<SearchPage />);
    const wrapper = component.find(".Search");
    expect(wrapper.length).toBe(0); //?
  });

  it("should handle go report button", () => {
    const mockGoToReport = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <SearchPage clickDone={mockGoToReport} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".GoToReport");
    wrapper.simulate("click");
    expect(mockGoToReport).toHaveBeenCalledTimes(0);
  });
});
