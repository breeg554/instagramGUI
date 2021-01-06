import { handleErrors, fetchConfig } from "../../utils/utils";
import { catchAuthError } from "../user/operations";
import { likePost } from "../selectedUser/operations";
import actions from "./actions";

const fetchFriendsPosts = async (limit = 0, skip = 0, config) => {
  return await fetch(
    `${process.env.REACT_APP_API_URL}/user/friends/posts?limit=${limit}&skip=${skip}`,
    {
      method: "GET",
      ...config,
    }
  ).then(handleErrors);
};
export const friendsPosts = (limit, skip) => async (dispatch, getState) => {
  await dispatch(actions.posts_loading());
  const token = getState().user.token;
  const config = fetchConfig(token);

  fetchFriendsPosts(limit, skip, config)
    .then((res) => {
      console.log(res);
      dispatch(actions.fetch_posts(res));
    })
    .catch(async (err) => {
      await dispatch(actions.posts_error());
      dispatch(catchAuthError(err));
    });
};

export const like = (id) => async (dispatch, getState) => {
  const token = getState().user.token;
  const config = fetchConfig(token);

  likePost(id, config)
    .then((res) => {
      dispatch(actions.toggle_like_post(res));
    })
    .catch(async (err) => {
      console.log(err);
      dispatch(catchAuthError(err));
    });
};
