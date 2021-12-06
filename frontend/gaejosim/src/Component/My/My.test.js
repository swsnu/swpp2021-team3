import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { shallow, mount } from "enzyme";

import My from "./My";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from "./../../Store/Reducers/UserReducer";

const rootReducer = combineReducers({
  userR: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

describe("<My />", () => {
  it("should render without errors", () => {
    const component = shallow(<My />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });

  it("should render without errors2", () => {
    const component = mount(
      <Router>
        <Provider store={store}>
          <My />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });
});
