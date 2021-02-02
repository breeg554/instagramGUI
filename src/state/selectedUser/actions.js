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
const toggle_follow_user = (payload) => ({
  type: types.TOGGLE_FOLLOW_USER,
  payload,
});
const push_user = (payload) => ({
  type: types.PUSH_USER,
  payload,
});
const posts_loading = () => ({
  type: types.USER_POSTS_LOADING,
});
const fetch_posts = (payload) => ({
  type: types.USER_FETCH_POSTS,
  payload,
});
const posts_error = () => ({
  type: types.USER_POSTS_ERROR,
});
const add_image = (payload) => ({
  type: types.ADD_IMAGE,
  payload,
});
const add_image_loading = (payload) => ({
  type: types.ADD_IMAGE_LOADING,
  payload,
});
const remove_image = (payload) => ({
  type: types.REMOVE_IMAGE,
  payload,
});
export default {
  selected_user_loading,
  selected_user_error,
  fetch_selected_user,
  user_clear_posts,
  toggle_like_user_post,
  toggle_follow_user,
  push_user,
  posts_loading,
  fetch_posts,
  posts_error,
  add_image,
  add_image_loading,
  remove_image,
};
