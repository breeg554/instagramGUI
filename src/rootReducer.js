import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import userReducer from "./state/user";
import selectedUserReducer from "./state/selectedUser";
import postsReducer from "./state/posts";

const appReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    selectedUser: selectedUserReducer,
    posts: postsReducer,
  });
const rootReducer = (history) => (state, action) => {
  if (action.type === "AUTH_ERROR") {
    state = undefined;
  }
  return appReducer(history)(state, action);
};

export default rootReducer;
