import * as actionTypes from "../Actions/ActionTypes";
// import userReducer from "./userReducer";
import userReducer from './UserReducer'

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
