import actions from "./actions";
import { handleErrors, fetchConfig } from "../../utils/utils";
import history from "../../history";

export const catchAuthError = (err) => async (dispatch, getState) => {
  if (parseInt(err.message) === 401) {
    history.push("/login");
    dispatch(actions.auth_error());
  }
};

const userLogMethod = async (data, config, method) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/user/${method}`, {
    method: "POST",
    ...config,
    body: JSON.stringify(data),
  }).then(handleErrors);
};

export const userLogin = (data) => async (dispatch, getState) => {
  await dispatch(actions.user_loading());
  const token = getState().user.token;
  const config = fetchConfig(token);

  userLogMethod(data, config, "login")
    .then(async (res) => {
      await dispatch(actions.login_success(res));
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      dispatch(actions.login_error());
    });
};
export const userRegister = (data) => async (dispatch, getState) => {
  const token = getState().user.token;
  const config = fetchConfig(token);

  userLogMethod(data, config, "register")
    .then((res) => {
      history.push("/login");
    })
    .catch((err) => {
      console.log(err);
    });
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
      console.log(res);
      dispatch(actions.user_authorized(res));
    })
    .catch((err) => {
      console.log(err);
      dispatch(catchAuthError(err));
    });
};
export const fetchSelectedUser = (name) => async (dispatch, getState) => {
  const token = getState().user.token;
  const config = fetchConfig(token);
  return await fetch(`${process.env.REACT_APP_API_URL}/user/${name}`, {
    method: "GET",
    ...config,
  })
    .then(handleErrors)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      dispatch(catchAuthError(err));
      return 404;
    });
};