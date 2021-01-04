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

export default {
  posts_loading,
  fetch_posts,
  posts_error,
};
