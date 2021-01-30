import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "../../../../components/Loading";
import Post from "../../../../components/Post";
import { PostWrapper } from "../../../HomePage/style";
import { isLoggedUserProfile } from "../../../../utils/utils";
import {
  like,
  selectedUserPosts,
} from "../../../../state/selectedUser/operations";

const Posts = ({
  loggedUser,
  user,
  posts,
  hasMore,
  postsLoading,
  postsError,
  likePost,
  selectedUserPosts,
}) => {
  const renderView = () => {
    if (postsError)
      return <p style={{ textAlign: "center" }}>Ups! Coś poszło nie tak!</p>;
    if (!postsLoading && posts.length <= 0) {
      return (
        <p style={{ textAlign: "center" }}>
          {isLoggedUserProfile(user.id, loggedUser)
            ? "Dodaj swój pierwszy post!"
            : "Użytkownik nie dodał żadnych postów!"}
        </p>
      );
    }
    return (
      <PostWrapper>
        <InfiniteScroll
          dataLength={posts.length}
          next={() => selectedUserPosts(user._id)}
          hasMore={hasMore}
          loader={<LoadingCircle />}
          endMessage={
            <p style={{ textAlign: "center" }}>Nie ma więcej postów!</p>
          }
        >
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                data={post}
                likePost={() => likePost(post.id)}
              />
            );
          })}
        </InfiniteScroll>
      </PostWrapper>
    );
  };
  return renderView();
};
const mapDispatchToProps = (dispatch) => ({
  likePost: (id) => dispatch(like(id)),
  selectedUserPosts: (id) => dispatch(selectedUserPosts(id)),
});
const mapStateToProps = (state) => ({
  user: state.selectedUser.user,
  loggedUser: state.user.user,
  posts: state.selectedUser.posts,
  postsLoading: state.selectedUser.postsLoading,
  postsError: state.selectedUser.postsError,
  hasMore: state.selectedUser.hasMore,
});
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
