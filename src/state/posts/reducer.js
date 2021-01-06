import types from "./types";
import history from "../../history";
const INITIAL_STATE = {
  posts: [],
  postsLoading: false,
  postsError: false,
  limit: 5,
  skip: 0,
  hasMore: true,
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.POSTS_LOADING:
      return {
        ...state,
        postsLoading: true,
      };
    case types.FETCH_POSTS:
      return {
        ...state,
        postsLoading: false,
        posts: [...state.posts, ...action.payload],
        skip: state.skip + action.payload.length,
        hasMore: action.payload.length < state.limit ? false : true,
      };
    case types.POSTS_ERROR:
      return {
        ...state,
        postsError: true,
        postsLoading: false,
      };
    case types.CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        postsLoading: false,
        postsError: false,
        limit: 5,
        skip: 0,
        hasMore: true,
      };
    case types.TOGGLE_LIKE_POST:
      const tmpPosts = [...state.posts];
      const index = tmpPosts.findIndex(
        (post) => post.id.toString() === action.payload.id.toString()
      );
      if (index > -1) {
        tmpPosts[index] = action.payload;
      }
      return {
        ...state,
        posts: tmpPosts,
      };
    default:
      return state;
  }
};
export default postsReducer;
