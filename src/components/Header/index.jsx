import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TogglerTheme from "../ToggleTheme";
import { AiOutlineHeart } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";
import { HiHome, HiOutlineSearch } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import { lightTheme } from "../../utils/theme";
import ProfilLink from "../ProfilLink";
import IconButton from "../IconButton";
import AddImage from "../AddImage";
import SearchUser from "../SearchUser";
import {
  HeaderWrapper,
  StyledHeader,
  MobileBottomHeader,
  LogoApp,
  HeaderIconWrapper,
} from "./style";
const Header = ({ headerRef, user, themeToggler, theme }) => {
  const [windowWidth, setWidth] = useState(0);
  const [isAddImageOpen, toggleAddImage] = useState(false);
  const [isSearchUserOpen, toggleSearchUser] = useState(false);

  const updateWindowWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);
  const isMobile = windowWidth < lightTheme.maxBoardWidth.split("px")[0];
  return (
    <HeaderWrapper>
      <StyledHeader ref={headerRef}>
        <LogoApp to="/">InstaApp</LogoApp>
        <HeaderIconWrapper>
          {!isMobile ? (
            <>
              <Link to="/">
                <IconButton>
                  <HiHome />
                </IconButton>
              </Link>
              <IconButton func={() => toggleSearchUser(true)}>
                <HiOutlineSearch />
              </IconButton>
              <IconButton func={() => toggleAddImage(true)}>
                <IoAddCircleOutline />
              </IconButton>
            </>
          ) : null}
          <IconButton>
            <AiOutlineHeart />
          </IconButton>
          <IconButton>
            <FiSend />
          </IconButton>
          {!isMobile ? (
            <>
              <ProfilLink size={30} user={user} withName={false} />
              <TogglerTheme toggleTheme={themeToggler} theme={theme} />
            </>
          ) : null}
        </HeaderIconWrapper>
      </StyledHeader>

      {isMobile ? (
        <MobileBottomHeader>
          <Link to="/">
            <IconButton>
              <HiHome />
            </IconButton>
          </Link>
          <IconButton func={() => toggleSearchUser(true)}>
            <HiOutlineSearch />
          </IconButton>
          <IconButton func={() => toggleAddImage(true)}>
            <IoAddCircleOutline />
          </IconButton>
          <TogglerTheme toggleTheme={themeToggler} theme={theme} />
          <ProfilLink user={user} withName={false} />
        </MobileBottomHeader>
      ) : null}
      {isAddImageOpen ? (
        <AddImage closeModal={() => toggleAddImage(false)} />
      ) : null}
      {isSearchUserOpen ? (
        <SearchUser closeModal={() => toggleSearchUser(false)} />
      ) : null}
    </HeaderWrapper>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
});
export default connect(mapStateToProps)(Header);
