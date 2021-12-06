import * as actionTypes from "../Actions/ActionTypes";

const initialUserState = {
  login: false,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_USER:
      // console.log("SIGNIN_USER")
      return { ...state, login: true };
    case actionTypes.SIGNOUT_USER:
      // console.log("SIGNOUT_USER")
      return { ...state, login: false };
    default:
      return state;
  }
};

export default userReducer;
