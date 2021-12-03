import React from "react";
import ReactDom from "react-dom";
import ReportAuthPage from "./ReportAuthPage";
import { BrowserRouter } from "react-router-dom";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import userReducer from "./../Store/Reducers/UserReducer";

const rootReducer = combineReducers({
  userR: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

it("renders ReportAuthPage without crashing", () => {
  const div = document.createElement("div");

  ReactDom.render(
    <Provider store={store}>
      <BrowserRouter>
        <ReportAuthPage />
      </BrowserRouter>
    </Provider>,
    div
  );

  ReactDom.unmountComponentAtNode(div);
});
