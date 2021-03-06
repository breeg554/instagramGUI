import { connect } from "react-redux";
import PropTypes from "prop-types";
import { removeImage } from "../../state/selectedUser/operations";
import { AiOutlineDelete } from "react-icons/ai";
import LikeButton from "../LikeButton";
import RemoveButton from "../IconButton";
import ProfilLink from "../ProfilLink";
import {
  PostArticle,
  PostHeader,
  PostImg,
  PostWrapper,
  PostSiteWrapper,
  PostDescription,
  Likes,
} from "./style";

const checkIfUserLikePost = (array, userID) => {
  const index = array.findIndex(
    (user) => user._id.toString() === userID.toString()
  );
  if (index > -1) return true;
  return false;
};
const isItUserImg = (userID, creatorID) => {
  if (userID.toString() === creatorID.toString()) return true;
  return false;
};
const Post = ({ removeImage, data, user, likePost }) => {
  const { name } = data.author;
  const { likes } = data;

  return (
    <PostArticle>
      <PostHeader>
        <ProfilLink user={data.author} />
        {isItUserImg(user.id, data.creatorID) ? (
          <RemoveButton size={20} func={() => removeImage(data.id)}>
            <AiOutlineDelete />
          </RemoveButton>
        ) : null}
      </PostHeader>
      <PostImg src={`${data.path}`} alt="post" />
      <PostWrapper>
        <PostSiteWrapper>
          <LikeButton
            size={20}
            active={checkIfUserLikePost(likes, user.id)}
            func={likePost}
          />
        </PostSiteWrapper>

        <Likes>
          Liczba polubień:<strong> {data.likes.length}</strong>
        </Likes>

        {data.description ? (
          <PostSiteWrapper>
            <PostDescription>
              <strong>{name} </strong> {data.description}
            </PostDescription>
          </PostSiteWrapper>
        ) : null}
      </PostWrapper>
    </PostArticle>
  );
};
const mapDispatchToProps = (dispatch) => ({
  removeImage: (id) => dispatch(removeImage(id)),
});
const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(Post);

Post.propTypes = {
  data: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
};
