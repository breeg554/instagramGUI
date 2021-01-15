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
      if (err.message === "404") {
        dispatch(actions.login_error());
      }
    });
};

const postImage = async (data, config) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/images`, {
    method: "POST",
    ...config,
    body: data,
  }).then(handleErrors);
};
export const addImage = (data, history) => async (dispatch, getState) => {
  await dispatch(actions.add_image_loading());
  const token = getState().user.token;
  const config = fetchConfig(token);
  delete config.headers["Content-Type"];

  postImage(data, config)
    .then(async (res) => {
      await dispatch(actions.add_image(res));
      const user = getState().user.user;
      // dispatch(selectedUserActions.fetch_selected_user(user));
      history.push(`/user/${user.name}`);
    })
    .catch((err) => {
      console.log(err);
      dispatch(catchAuthError(err));
    });
};
const deleteImage = async (id, config) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/images/${id}`, {
    method: "DELETE",
    ...config,
  }).then(handleErrors);
};
export const removeImage = (id) => async (dispatch, getState) => {
  const token = getState().user.token;
  const config = fetchConfig(token);

  deleteImage(id, config)
    .then(async () => {
      await dispatch(actions.remove_image(id));
      const user = getState().user.user;
      dispatch(selectedUserActions.fetch_selected_user(user));
    })
    .catch((err) => {
      console.log(err);
      dispatch(catchAuthError(err));
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
      console.log(err);
      dispatch(catchAuthError(err));
      return false;
    });
};
