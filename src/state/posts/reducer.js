import types from "./types";
import history from "../../history";
const INITIAL_STATE = {
  posts: [],
  posts_loading: false,
  posts_error: false,
  limit: 5,
  skip: 0,
  hasMore: true,
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.POSTS_LOADING:
      return {
        ...state,
        posts_loading: true,
      };
    case types.FETCH_POSTS:
      return {
        ...state,
        posts_loading: false,
        posts: [...state.posts, ...action.payload],
        skip: state.skip + action.payload.length,
        hasMore: action.payload.length < state.limit ? false : true,
      };
    case types.POSTS_ERROR:
      return {
        ...state,
        posts_error: true,
        posts_loading: false,
      };

    default:
      return state;
  }
};
export default postsReducer;
