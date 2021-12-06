// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { createStore, combineReducers, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";

// import userReducer from "./Store/Reducers/UserReducer";

// const rootReducer = combineReducers({
//   userR: userReducer,
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

jest.mock("react-dom", () => ({ render: jest.fn() }));
describe("Application root", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("./index.js");
    // expect(ReactDOM.render).toHaveBeenCalledWith(
    //   <Provider store={store}>
    //     <React.StrictMode>
    //       <App />
    //     </React.StrictMode>
    //   </Provider>,
    //   div
    // );
  });
});
