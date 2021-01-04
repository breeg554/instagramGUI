import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import userReducer from "./state/user";
import postsReducer from "./state/posts";
const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    posts: postsReducer,
  });
export default rootReducer;
