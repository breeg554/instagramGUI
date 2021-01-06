import { connect } from "react-redux";
import Post from "../../../../components/Post";
import { like } from "../../../../state/selectedUser/operations";
import { PostWrapper } from "../../../HomePage/style";
const Posts = ({ user, likePost }) => {
  return (
    <PostWrapper>
      {user.images.map((post) => {
        return (
          <Post key={post.id} data={post} likePost={() => likePost(post.id)} />
        );
      })}
    </PostWrapper>
  );
};
const mapDispatchToProps = (dispatch) => ({
  likePost: (id) => dispatch(like(id)),
});
const mapStateToProps = (state) => ({
  user: state.selectedUser.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
