import { connect } from "react-redux";
import TogglerTheme from "../TogglerTheme";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import {
  StyledHeader,
  StyledSubHeader,
  LogoApp,
  HeaderIconWrapper,
} from "./style";
import IconButton from "../IconButton";
const Header = ({ headerRef, themeToggler, user }) => {
  return (
    <StyledHeader ref={headerRef}>
      <LogoApp>
        <span>InstaApp</span>
      </LogoApp>
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
        <button>zdj</button>
        <TogglerTheme toggleTheme={themeToggler} />
        <IconButton size={30}>
          {user.avatar ? (
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/${user.avatar}`}
              alt="avatar"
            />
          ) : (
            <AiOutlineUser />
          )}
        </IconButton>
      </StyledSubHeader>
    </StyledHeader>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps)(Header);
