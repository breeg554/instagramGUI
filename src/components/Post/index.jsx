import { connect } from "react-redux";
import PropTypes from "prop-types";
import { AiOutlineUser } from "react-icons/ai";
import {
  PostArticle,
  PostHeader,
  ProfilLink,
  PostImg,
  PostSiteWrapper,
  PostDescription,
  Likes,
} from "./style";
import LikeButton from "../LikeButton";

const checkIfUserLikePost = (array, userID) => {
  const index = array.findIndex(
    (user) => user._id.toString() === userID.toString()
  );
  if (index > -1) return true;
  return false;
};

const Post = ({ data, user, likePost }) => {
  const { id, avatar, name } = data.author;
  const { likes } = data;

  return (
    <PostArticle>
      <PostHeader>
        <ProfilLink
          to={{
            pathname: `/user/${name}`,
            state: {
              id: id,
              name: name,
              avatar: avatar,
            },
          }}
        >
          {avatar ? (
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/${avatar}`}
              alt="profile"
            />
          ) : (
            <AiOutlineUser />
          )}
        </ProfilLink>
        <h3>{name}</h3>
      </PostHeader>
      <PostImg
        src={`${process.env.REACT_APP_IMAGES_URL}/${data.path}`}
        alt="post"
      />
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
    </PostArticle>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps)(Post);

Post.propTypes = {
  data: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
};
