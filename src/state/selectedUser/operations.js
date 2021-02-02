import actions from "./actions";
import { catchAuthError } from "../user/operations";
import { handleErrors, fetchConfig } from "../../utils/utils";

const fetchSelectedUser = async (name, config) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/user/${name}`, {
    method: "GET",
    ...config,
  }).then(handleErrors);
};
export const selectedUser = (name) => async (dispatch, getState) => {
  await dispatch(actions.user_clear_posts());
  await dispatch(actions.selected_user_loading());

  const { user, token } = getState().user;
  if (user && user.name === name) {
    await dispatch(actions.fetch_selected_user(user));
    return dispatch(selectedUserPosts(user._id));
  }

  const config = fetchConfig(token);

  fetchSelectedUser(name, config)
    .then(async (res) => {
      await dispatch(actions.fetch_selected_user(res));
      dispatch(selectedUserPosts(res._id));
    })
    .catch(async (err) => {
      await dispatch(actions.selected_user_error());
      dispatch(catchAuthError(err));
    });
};

const fetchPosts = async (limit = 0, skip = 0, id, config) => {
  return await fetch(
    `${process.env.REACT_APP_API_URL}/images/user/${id}?limit=${limit}&skip=${skip}`,
    {
      method: "GET",
      ...config,
    }
  ).then(handleErrors);
};
export const selectedUserPosts = (id) => async (dispatch, getState) => {
  const { limit, skip, postsLoading } = getState().selectedUser;
  if (postsLoading) return;
  await dispatch(actions.posts_loading());
  const token = getState().user.token;

  const config = fetchConfig(token);

  fetchPosts(limit, skip, id, config)
    .then((res) => {
      dispatch(actions.fetch_posts(res));
    })
    .catch(async (err) => {
      await dispatch(actions.posts_error());
      dispatch(catchAuthError(err));
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
  await dispatch(actions.add_image_loading(true));
  const token = getState().user.token;
  const config = fetchConfig(token);
  delete config.headers["Content-Type"];

  return await postImage(data, config)
    .then(async (res) => {
      await dispatch(actions.add_image(res));
      const user = getState().user.user;
      history.push(`/${user.name}`);
    })
    .catch(async (err) => {
      await dispatch(actions.add_image_loading(false));
      dispatch(catchAuthError(err));
      return err;
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
    })
    .catch((err) => {
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
