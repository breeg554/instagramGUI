import PropTypes from "prop-types";
import { AiOutlineUser } from "react-icons/ai";
import {
  PostArticle,
  PostHeader,
  ProfilLink,
  PostImg,
  PostDescription,
} from "./style";
const Post = ({ data }) => {
  return (
    <PostArticle>
      <PostHeader>
        <ProfilLink to="/">
          {data.author.avatar ? (
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/${data.author.avatar}`}
              alt="profile"
            />
          ) : (
            <AiOutlineUser />
          )}
        </ProfilLink>
        <h3>{data.author.name}</h3>
      </PostHeader>
      <PostImg
        src={`${process.env.REACT_APP_IMAGES_URL}/${data.path}`}
        alt="post"
      />
      {data.description ? (
        <PostDescription>
          <p>
            <strong>{data.author.name} </strong> {data.description}
          </p>
        </PostDescription>
      ) : null}
    </PostArticle>
  );
};

export default Post;
Post.propTypes = {
  data: PropTypes.object.isRequired,
};
