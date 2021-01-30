import types from "./types";

const INITIAL_STATE = {
  user: null,
  userLoading: false,
  userError: false,
  addImageLoading: false,
  posts: [],
  postsLoading: true,
  postsError: false,
  limit: 5,
  skip: 0,
  hasMore: true,
};

const selectedUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SELECTED_USER_LOADING:
      return {
        ...state,
        userLoading: true,
      };
    case types.SELECTED_USER_ERROR:
      return {
        ...state,
        userError: true,
        userLoading: false,
      };
    case types.FETCH_SELECTED_USER:
      return {
        ...state,
        userError: false,
        userLoading: false,
        user: action.payload,
      };

    case types.USER_CLEAR_POSTS:
      return INITIAL_STATE;
    case types.TOGGLE_FOLLOW_USER:
      let tmpFollowers = [...state.user.followers];
      const i = tmpFollowers.findIndex((user) => user._id === action.payload);
      if (i > -1)
        tmpFollowers = tmpFollowers.filter(
          (user) => user._id !== action.payload
        );
      else tmpFollowers.push({ _id: action.payload });
      return {
        ...state,
        user: { ...state.user, followers: tmpFollowers },
      };
    case types.PUSH_USER:
      return {
        ...state,
        user: action.payload,
      };
    case types.TOGGLE_LIKE_USER_POST:
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
    case types.USER_POSTS_LOADING:
      return {
        ...state,
        postsLoading: true,
      };
    case types.USER_FETCH_POSTS:
      return {
        ...state,
        postsLoading: false,
        posts: [...state.posts, ...action.payload],
        skip: state.skip + action.payload.length,
        hasMore: action.payload.length < state.limit ? false : true,
      };
    case types.USER_POSTS_ERROR:
      return {
        ...state,
        postsError: true,
        postsLoading: false,
      };
    case types.ADD_IMAGE_LOADING:
      return {
        ...state,
        addImageLoading: true,
      };
    case types.ADD_IMAGE:
      let posts = [...state.posts];
      posts = [action.payload, ...posts];
      return {
        ...state,
        addImageLoading: false,
        posts: posts,
      };
    case types.REMOVE_IMAGE:
      let tmpImages = [...state.posts];
      tmpImages = tmpImages.filter((img) => img.id !== action.payload);

      return {
        ...state,
        posts: tmpImages,
      };
    default:
      return state;
  }
};
export default selectedUserReducer;
