import actions from "./actions";
import { handleErrors, fetchConfig } from "../../utils/utils";
import history from "../../history";

const userLogMethod = async (data, config, method) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/user/${method}`, {
    method: "POST",
    ...config,
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .catch((err) => {
      return err;
    });
};

export const userLogin = (data) => async (dispatch, getState) => {
  await dispatch(actions.user_loading());
  const token = getState().user.token;
  const config = fetchConfig(token);

  userLogMethod(data, config, "login")
    .then(async (res) => {
      if (!res.user) {
        return dispatch(actions.login_error());
      }
      await dispatch(actions.login_success(res));
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
export const userRegister = (data) => async (dispatch, getState) => {
  const token = getState().user.token;
  const config = fetchConfig(token);

  userLogMethod(data, config, "register")
    .then((res) => {
      if (res.message === ("422" || 400)) return console.log(res);
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
  })
    .then(handleErrors)
    .catch((err) => {
      return err;
    });
};
export const userData = () => async (dispatch, getState) => {
  await dispatch(actions.user_loading());
  const token = getState().user.token;
  const config = fetchConfig(token);

  fetchUserData(config)
    .then(async (res) => {
      if (!res.id) {
        await dispatch(actions.auth_error());
        return history.push("/login");
      }
      await dispatch(actions.user_authorized(res));
    })
    .catch((err) => {
      console.log(err);
    });
};
