import PropTypes from "prop-types";
import { ProfilLink } from "./style";
import { BsFillPersonFill } from "react-icons/bs";
const Profil = ({ user, withName, size }) => {
  return (
    <ProfilLink to={`/${user.name}`} size={size}>
      <div>
        {user.avatar ? (
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${user.avatar}`}
            alt="profile"
          />
        ) : (
          <BsFillPersonFill />
        )}
      </div>
      {withName ? <h3>{user.name}</h3> : null}
    </ProfilLink>
  );
};

export default Profil;
Profil.defaultProps = {
  withName: true,
  size: 30,
};
Profil.propTypes = {
  user: PropTypes.object.isRequired,
  withName: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
};
