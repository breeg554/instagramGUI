import types from "./types";

const user_loading = () => ({
  type: types.USER_LOADING,
});
const user_authorized = (payload) => ({
  type: types.USER_AUTHORIZED,
  payload,
});
const login_success = (payload) => ({
  type: types.LOGIN_SUCCESS,
  payload,
});
const login_error = () => ({
  type: types.LOGIN_ERROR,
});
const logout_success = () => ({
  type: types.LOGOUT_SUCCESS,
});
const auth_error = () => ({
  type: types.AUTH_ERROR,
});
export default {
  user_loading,
  user_authorized,
  login_error,
  logout_success,
  login_success,
  auth_error,
};
