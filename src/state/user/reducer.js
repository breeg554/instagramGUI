import types from "./types";
import history from "../../history";
const INITIAL_STATE = {
  token: localStorage.getItem("token") || null,
  user_loading: true,
  user_authorized: false,
  user: {},
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER_LOADING:
      return {
        ...state,
        user_loading: true,
      };
    case types.USER_AUTHORIZED:
      return {
        ...state,
        user_authorized: true,
        user_loading: false,
        user: action.payload,
      };
    case types.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user_authorized: true,
        user_loading: false,
        token: action.payload.token,
        user: action.payload.user,
      };
    case types.LOGIN_ERROR:
    case types.AUTH_ERROR:
    case types.LOGOUT_SUCCESS:
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        user_authorized: false,
        user_loading: false,
        user: {},
      };
    default:
      return state;
  }
};
export default authReducer;
