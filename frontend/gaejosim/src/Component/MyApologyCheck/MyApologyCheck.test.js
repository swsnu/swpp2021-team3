import React from "react";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import MyApologyCheck from "./MyApologyCheck";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from "./../../Store/Reducers/UserReducer";

const rootReducer = combineReducers({
  userR: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));


describe("<MyApologyCheck />", () => {
  it("should render without errors", () => {
    const component = shallow(<MyApologyCheck />);
    const wrapper = component.find(".My");
    expect(wrapper.length).toBe(0);
  });

  xit("should handle apology_check_completed_button button", () => {
    const mock_apology_check_completed_button = jest.fn();
    const component = mount(
      <Router>
        <Provider store={store}>
          <MyApologyCheck clickDone={mock_apology_check_completed_button} />
        </Provider>
      </Router>
    );
    const wrapper = component.find(".Apology_check_completed_button");
    wrapper.simulate("click");
    expect(mock_apology_check_completed_button).toHaveBeenCalledTimes(0);
  });
});
