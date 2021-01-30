import types from "./types";

const INITIAL_STATE = {
  token: localStorage.getItem("token") || null,
  userLoading: true,
  userAuthorized: false,
  user: "",
  followLoading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER_LOADING:
      return {
        ...state,
        userLoading: true,
      };
    case types.USER_AUTHORIZED:
      return {
        ...state,
        userAuthorized: true,
        userLoading: false,
        user: action.payload,
      };
    case types.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        userAuthorized: true,
        userLoading: false,
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
        userAuthorized: false,
        userLoading: false,
        user: "",
      };

    case types.FOLLOW_LOADING:
      return {
        ...state,
        followLoading: true,
      };
    case types.FOLLOW_USER:
      return {
        ...state,
        followLoading: false,
        user: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
