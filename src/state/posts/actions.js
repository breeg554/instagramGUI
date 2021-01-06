import types from "./types";

const posts_loading = () => ({
  type: types.POSTS_LOADING,
});
const fetch_posts = (payload) => ({
  type: types.FETCH_POSTS,
  payload,
});
const posts_error = () => ({
  type: types.POSTS_ERROR,
});
const clear_posts = () => ({
  type: types.CLEAR_POSTS,
});
const toggle_like_post = (payload) => ({
  type: types.TOGGLE_LIKE_POST,
  payload,
});
export default {
  posts_loading,
  fetch_posts,
  posts_error,
  clear_posts,
  toggle_like_post,
};
