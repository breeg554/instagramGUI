import { handleErrors, fetchConfig } from "../../utils/utils";
import actions from "./actions";

const fetchFriendsPosts = async (limit = 0, skip = 0, config) => {
  return await fetch(
    `${process.env.REACT_APP_API_URL}/user/friends/posts?limit=${limit}&skip=${skip}`,
    {
      method: "GET",
      ...config,
    }
  )
    .then(handleErrors)
    .catch((err) => {
      return err;
    });
};
export const friendsPosts = (limit, skip) => async (dispatch, getState) => {
  await dispatch(actions.posts_loading());
  const token = getState().user.token;
  const config = fetchConfig(token);

  fetchFriendsPosts(limit, skip, config)
    .then((res) => {
      if (!Array.isArray(res)) return dispatch(actions.posts_error());

      console.log(res);
      dispatch(actions.fetch_posts(res));
    })
    .catch((err) => {
      console.log(err);
    });
};
