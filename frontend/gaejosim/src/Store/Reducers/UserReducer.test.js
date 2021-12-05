import React from "react";

import * as actionTypes from "../actions/actionTypes";
import userReducer from "./userReducer";

const initialUserState = {
  login: false,
};

const secondUserState = {
  login: true,
};

describe("userReducer", () => {
  it("should get sign out", () => {
    const newState = userReducer(undefined, {
      type: actionTypes.SIGNOUT_USER,
      userInfo: "USER",
    });
    expect(newState).toEqual(initialUserState);
  });

  it("should get sign up", () => {
    const newState = userReducer(undefined, {
      type: actionTypes.SIGNIN_USER,
      userInfo: "USER",
    });
    expect(newState).toEqual(secondUserState);
  });
});
