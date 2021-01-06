import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import TogglerTheme from "../TogglerTheme";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import {
  StyledHeader,
  StyledSubHeader,
  LogoApp,
  HeaderIconWrapper,
} from "./style";
import { ProfilLink } from "../Post/style";
import IconButton from "../IconButton";
const Header = ({ headerRef, themeToggler, user }) => {
  const location = useLocation();
  return (
    <StyledHeader ref={headerRef}>
      <LogoApp to="/">InstaApp</LogoApp>
      <HeaderIconWrapper>
        <IconButton>
          <AiOutlineHeart />
        </IconButton>
        <IconButton>
          <FiSend />
        </IconButton>
      </HeaderIconWrapper>
      <StyledSubHeader>
        <button>Dom</button>
        <button>wyszuk</button>
        <button>
          <IoAddCircleOutline />
          {/* <input
            type="file"
            id="file"
            name="file"
            accept="image/png, image/jpeg"
          /> */}
        </button>
        <TogglerTheme toggleTheme={themeToggler} />
        <ProfilLink
          to={{
            pathname: `/user/${user.name}`,
            state: {
              from: location.pathname,
              id: user.id,
              name: user.name,
              avatar: user.avatar,
            },
          }}
          size={30}
        >
          {user.avatar ? (
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/${user.avatar}`}
              alt="avatar"
            />
          ) : (
            <AiOutlineUser />
          )}
        </ProfilLink>
      </StyledSubHeader>
    </StyledHeader>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps)(Header);
