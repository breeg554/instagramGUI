import actions from "./actions";
import selectedUserActions from "../selectedUser/actions";
import { handleErrors, fetchConfig } from "../../utils/utils";
import history from "../../history";

export const catchAuthError = (err) => async (dispatch, getState) => {
  if (parseInt(err.message) === 401) {
    history.push("/login");
    dispatch(actions.auth_error());
  }
};

const login = async (data, config) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
    method: "POST",
    ...config,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
const register = async (data, config) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
    method: "POST",
    ...config,
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const userLogin = (data) => async (dispatch, getState) => {
  await dispatch(actions.user_loading());
  const token = getState().user.token;
  const config = fetchConfig(token);

  return await login(data, config)
    .then(async (res) => {
      if (res.error) throw res;
      await dispatch(actions.login_success(res));
      history.push("/");
    })
    .catch((err) => {
      dispatch(actions.login_error());
      return err;
    });
};
export const userRegister = (data) => async (dispatch, getState) => {
  const token = getState().user.token;
  const config = fetchConfig(token);

  return await register(data, config);
};
const fetchUserData = async (config) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/user`, {
    method: "GET",
    ...config,
  }).then(handleErrors);
};
export const userData = () => async (dispatch, getState) => {
  await dispatch(actions.user_loading());
  const token = getState().user.token;
  const config = fetchConfig(token);

  fetchUserData(config)
    .then(async (res) => {
      dispatch(actions.user_authorized(res));
    })
    .catch((err) => {
      console.log(err);
      dispatch(catchAuthError(err));
      if (err.message === "404") {
        dispatch(actions.login_error());
      }
    });
};

const postFollow = async (userID, config) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
    method: "POST",
    ...config,
    body: JSON.stringify({ userID }),
  }).then(handleErrors);
};
export const toggleFollow = (id) => async (dispatch, getState) => {
  await dispatch(actions.follow_loading());
  const token = getState().user.token;
  const selectedUser = getState().selectedUser.user;

  const config = fetchConfig(token);
  return postFollow(id, config)
    .then(async (res) => {
      await dispatch(actions.follow_user(res));
      if (!selectedUser) return;
      else if (selectedUser.id === id) {
        await dispatch(selectedUserActions.toggle_follow_user(res.id));
      } else if (selectedUser.id === res.id) {
        await dispatch(selectedUserActions.push_user(res));
      }

      return true;
    })
    .catch((err) => {
      dispatch(catchAuthError(err));
      return false;
    });
};
