import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { friendsPosts } from "../../state/posts/operations";
import { PostWrapper } from "./style";
import Post from "../../common/Post";
import LoadingCircle from "../../common/Loading";
const Dekstop = ({
  friendsPosts,
  posts,
  posts_loading,
  posts_error,
  limit,
  skip,
  hasMore,
}) => {
  useEffect(() => {
    friendsPosts(limit, skip);
  }, []);

  if (posts_error) return <p>Ups! Cos poszlo nie tak</p>;
  return (
    <PostWrapper>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => friendsPosts(limit, skip)}
        hasMore={hasMore}
        loader={
          <div style={{ textAlign: "center" }}>
            <LoadingCircle size={20} />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>Nie ma więcej postów!</p>
        }
      >
        {posts.map((post) => (
          <Post key={post.id} data={post} />
        ))}
      </InfiniteScroll>
    </PostWrapper>
  );
};
const mapDispatchToProps = (dispatch) => ({
  friendsPosts: (limit, skip) => dispatch(friendsPosts(limit, skip)),
});
const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  posts_loading: state.posts.posts_loading,
  posts_error: state.posts.posts_error,
  limit: state.posts.limit,
  skip: state.posts.skip,
  hasMore: state.posts.hasMore,
});
export default connect(mapStateToProps, mapDispatchToProps)(Dekstop);
