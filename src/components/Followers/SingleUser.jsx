import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toggleFollow } from "../../state/user/operations";
import ProfilLink from "../ProfilLink";
import { SingleFollower } from "./style";
import { isUserAlreadyFollow, isLoggedUserProfile } from "../../utils/utils";
import ToggleFollow from "../ToggleFollow";
const Follower = ({ data, loggedUser, toggleFollow, closeModal }) => {
  return (
    <SingleFollower>
      <ProfilLink closeModal={closeModal} user={data} />
      {isLoggedUserProfile(data.id, loggedUser) ? (
        <p>ty</p>
      ) : (
        <ToggleFollow
          isFollowed={isUserAlreadyFollow(data.id, loggedUser)}
          func={() => toggleFollow(data.id)}
        />
      )}
    </SingleFollower>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleFollow: (id) => dispatch(toggleFollow(id)),
});
const mapStateToProps = (state) => ({
  loggedUser: state.user.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(Follower);
Follower.propTypes = {
  data: PropTypes.object.isRequired,
  closeModal: PropTypes.func,
};
