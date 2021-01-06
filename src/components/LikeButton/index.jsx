import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import PropTypes from "prop-types";
import { LikeButton } from "./style";
const Like = ({ active, size, func }) => {
  return (
    <LikeButton size={size} active={active} onClick={func}>
      <AiFillHeart /> <AiOutlineHeart />
    </LikeButton>
  );
};

export default Like;
Like.defaultProps = {
  size: 25,
};
Like.propTypes = {
  size: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  func: PropTypes.func.isRequired,
};
