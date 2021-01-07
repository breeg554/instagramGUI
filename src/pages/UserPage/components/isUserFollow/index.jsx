import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ToggleFollow from "../../../../components/ToggleFollow";
import { MessageLink, MessageWrapper } from "./style";
import { toggleFollow } from "../../../../state/user/operations";
import {
  isLoggedUserProfile,
  isUserAlreadyFollow,
} from "../../../../utils/utils";

const IsUserFollow = ({ user, loggedUser, toggleFollow }) => {
  return isLoggedUserProfile(user.id, loggedUser) ? null : (
    <MessageWrapper>
      {isUserAlreadyFollow(user.id, loggedUser) ? (
        <MessageLink to="/">Wyślij wiadomość</MessageLink>
      ) : null}
      <ToggleFollow
        func={() => toggleFollow(user.id)}
        isFollowed={isUserAlreadyFollow(user.id, loggedUser)}
      />
    </MessageWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleFollow: (id) => dispatch(toggleFollow(id)),
});
const mapStateToProps = (state) => ({
  user: state.selectedUser.user,
  loggedUser: state.user.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(IsUserFollow);
