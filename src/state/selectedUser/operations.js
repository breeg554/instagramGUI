import actions from "./actions";
import userActions from "../user/actions";
import { catchAuthError } from "../user/operations";
import { handleErrors, fetchConfig } from "../../utils/utils";

const fetchSelectedUser = async (name, config) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/user/${name}`, {
    method: "GET",
    ...config,
  }).then(handleErrors);
};
export const selectedUser = (name) => async (dispatch, getState) => {
  await dispatch(actions.selected_user_loading());

  const { user, token } = getState().user;
  if (user.name.toString() === name.toString())
    return dispatch(actions.fetch_selected_user(user));

  const config = fetchConfig(token);

  fetchSelectedUser(name, config)
    .then(async (res) => {
      await dispatch(actions.fetch_selected_user(res));
    })
    .catch(async (err) => {
      console.log(err);
      await dispatch(actions.selected_user_error());
      dispatch(catchAuthError(err));
    });
};

export const likePost = async (id, config) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/images/${id}`, {
    method: "PUT",
    ...config,
  }).then(handleErrors);
};
export const like = (id) => async (dispatch, getState) => {
  const token = getState().user.token;
  const config = fetchConfig(token);

  likePost(id, config)
    .then((res) => {
      dispatch(actions.toggle_like_user_post(res));
    })
    .catch(async (err) => {
      dispatch(catchAuthError(err));
    });
};
export const getFollowersOrFollowingUsers = (id, type, limit, skip) => async (
  dispatch,
  getState
) => {
  const token = getState().user.token;
  const config = fetchConfig(token);

  return await fetch(
    `${process.env.REACT_APP_API_URL}/user/${type}/${id}?limit=${limit}&skip=${skip}`,
    {
      method: "GET",
      ...config,
    }
  )
    .then(handleErrors)
    .then((res) => res)
    .catch(async (err) => {
      dispatch(catchAuthError(err));
    });
};
export const serachUserByName = (term, limit, signal) => async (
  dispatch,
  getState
) => {
  const token = getState().user.token;
  const config = fetchConfig(token);

  return await fetch(
    `${process.env.REACT_APP_API_URL}/user/accounts/search?term=${term}&limit=${limit}`,
    {
      method: "GET",
      ...config,
      signal,
    }
  )
    .then(handleErrors)
    .then((res) => res)
    .catch(async (err) => {
      dispatch(catchAuthError(err));
    });
};
