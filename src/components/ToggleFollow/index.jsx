import { useState } from "react";
import PropTypes from "prop-types";
import { RiUserFollowLine } from "react-icons/ri";
import { Button, LoadingWrapper } from "./style";
import LoadingCircle from "../Loading";
const ToggleFollow = ({ isFollowed, func }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleFollow = () => {
    setIsLoading(true);
    func().then(() => setIsLoading(false));
  };
  return (
    <Button
      onClick={handleFollow}
      isFollowed={isFollowed}
      isLoading={isLoading}
      disabled={isLoading}
    >
      {isFollowed ? <RiUserFollowLine /> : "Obserwuj"}
      {isLoading ? (
        <LoadingWrapper>
          <LoadingCircle size={15} />
        </LoadingWrapper>
      ) : null}
    </Button>
  );
};

export default ToggleFollow;
ToggleFollow.propTypes = {
  func: PropTypes.func.isRequired,
  isFollowed: PropTypes.bool.isRequired,
};
