import React, { useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../../components/Post";
import LoadingCircle from "../../components/Loading";
import { like } from "../../state/posts/operations";
import { friendsPosts } from "../../state/posts/operations";
import { PostWrapper } from "./style";

const Dekstop = ({
  friendsPosts,
  posts,
  postsError,
  postsLoading,
  hasMore,
  likePost,
}) => {
  useEffect(() => {
    if (hasMore) friendsPosts();
    window.scrollTo(0, 0);
  }, []);

  if (postsError) return <p>Ups! Cos poszlo nie tak</p>;
  return (
    <>
      <PostWrapper>
        <InfiniteScroll
          dataLength={posts.length}
          next={() => friendsPosts()}
          hasMore={hasMore}
          loader={<LoadingCircle />}
          endMessage={
            <p style={{ textAlign: "center" }}>Nie ma więcej postów!</p>
          }
        >
          {posts.map((post) => (
            <Post
              key={post.id}
              data={post}
              likePost={() => likePost(post.id)}
            />
          ))}
        </InfiniteScroll>
      </PostWrapper>
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  friendsPosts: (limit, skip) => dispatch(friendsPosts(limit, skip)),
  clearPosts: () => dispatch({ type: "CLEAR_POSTS" }),
  likePost: (id) => dispatch(like(id)),
});
const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  postsError: state.posts.postsError,
  postsLoading: state.posts.postsLoading,
  hasMore: state.posts.hasMore,
});
export default connect(mapStateToProps, mapDispatchToProps)(Dekstop);
