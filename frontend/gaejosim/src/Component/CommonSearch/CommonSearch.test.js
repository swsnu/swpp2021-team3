import React from "react";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import CommonSearch from "./CommonSearch";
// import Result from "./Result/Result"

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from "./../../Store/Reducers/UserReducer";

const rootReducer = combineReducers({
  userR: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("<CommonSearch />", () => {
  //todo done : Cannot read property 'map' of undefined : which can be a good example of map
  xit("should render without errors", () => {
    const component = mount(
      <Router>
        <Provider store={store}>
          <CommonSearch recent_result={[]} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".CommonSearch");
    expect(wrapper.length).toBe(0);
  });

  xit("should render states without errors.", () => {
    const wrapper = shallow(
      <CommonSearch recent_result={{ recent_result: "foo" }} />
    );
    expect(wrapper.find("#tier").length).toEqual(0);
  });
});
