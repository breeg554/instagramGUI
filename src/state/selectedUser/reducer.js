import types from "./types";
import history from "../../history";
const INITIAL_STATE = {
  user: null,
  userLoading: false,
  userError: false,
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
      return {
        ...state,
        user: null,
        userLoading: false,
        userError: false,
      };
    case types.TOGGLE_LIKE_USER_POST:
      const tmpUser = { ...state.user };
      const index = tmpUser.images.findIndex(
        (post) => post.id.toString() === action.payload.id.toString()
      );

      if (index > -1) {
        tmpUser.images[index] = action.payload;
      }
      return {
        ...state,
        user: tmpUser,
      };
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
        user: action.payload,
      };
    default:
      return state;
  }
};
export default selectedUserReducer;
