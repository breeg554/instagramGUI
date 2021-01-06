import { useState } from "react";
import { connect } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import TogglerTheme from "../ToggleTheme";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import { HiHome } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import {
  HeaderWrapper,
  StyledHeader,
  StyledSubHeader,
  LogoApp,
  HeaderIconWrapper,
} from "./style";
import { ProfilLink } from "../Post/style";
import IconButton from "../IconButton";
import AddImage from "../AddImage";
const Header = ({ headerRef, user, themeToggler, theme }) => {
  const location = useLocation();
  const [isAddImageOpen, toggleOpen] = useState(false);
  return (
    <HeaderWrapper>
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
          <Link to="/">
            <IconButton>
              <HiHome />
            </IconButton>
          </Link>
          <button>wyszuk</button>
          <IconButton func={() => toggleOpen(true)}>
            <IoAddCircleOutline />
          </IconButton>
          <TogglerTheme toggleTheme={themeToggler} theme={theme} />
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
      {isAddImageOpen ? <AddImage close={() => toggleOpen(false)} /> : null}
    </HeaderWrapper>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps)(Header);
