import types from "./types";

const selected_user_loading = () => ({
  type: types.SELECTED_USER_LOADING,
});
const selected_user_error = () => ({
  type: types.SELECTED_USER_ERROR,
});
const fetch_selected_user = (payload) => ({
  type: types.FETCH_SELECTED_USER,
  payload,
});

const user_clear_posts = () => ({
  type: types.USER_CLEAR_POSTS,
});
const toggle_like_user_post = (payload) => ({
  type: types.TOGGLE_LIKE_USER_POST,
  payload,
});
export default {
  selected_user_loading,
  selected_user_error,
  fetch_selected_user,
  user_clear_posts,
  toggle_like_user_post,
};
