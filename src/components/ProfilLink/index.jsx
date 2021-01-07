import PropTypes from "prop-types";
import { ProfilLink } from "./style";
import { AiOutlineUser } from "react-icons/ai";
const Profil = ({ user, withName }) => {
  return (
    <ProfilLink to={`/user/${user.name}`}>
      {user.avatar ? (
        <img
          src={`${process.env.REACT_APP_IMAGES_URL}/${user.avatar}`}
          alt="profile"
        />
      ) : (
        <AiOutlineUser />
      )}
      {withName ? <h3>{user.name}</h3> : null}
    </ProfilLink>
  );
};

export default Profil;
Profil.defaultProps = {
  withName: true,
};
Profil.propTypes = {
  user: PropTypes.object.isRequired,
  withName: PropTypes.bool.isRequired,
};
