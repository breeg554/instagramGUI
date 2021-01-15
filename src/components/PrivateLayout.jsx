import { useState, useRef, useEffect, cloneElement } from "react";
import { connect } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { GlobalRouteStyles } from "./GlobalStyles";
import { darkTheme, lightTheme } from "../utils/theme";
import { useDarkMode } from "./useDarkMode";
import Header from "./Header";
import LoadingCircle from "./Loading";
const Main = styled.main`
  margin-top: ${({ headerHeight }) => `${headerHeight}px`};
  margin-bottom: ${({ headerHeight }) => `${headerHeight}px`};
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: ${({ theme }) => theme.maxBoardWidth};
`;
const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Layout = ({ children, userLoading, userAuthorized }) => {
  const headerRef = useRef();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    if (userAuthorized) {
      const header = headerRef.current;
      setHeaderHeight(header.offsetHeight + 5);
    }
  }, [userAuthorized]);

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalRouteStyles />
      {userLoading ? (
        <LoadingWrapper>
          <LoadingCircle size={20} />
        </LoadingWrapper>
      ) : (
        <>
          <Header
            headerRef={headerRef}
            themeToggler={themeToggler}
            theme={theme}
          />
          <Main headerHeight={headerHeight}>
            {" "}
            {cloneElement(children, { headerHeight })}
          </Main>
        </>
      )}
    </ThemeProvider>
  );
};
const mapStateToProps = (state) => ({
  userAuthorized: state.user.userAuthorized,
  userLoading: state.user.userLoading,
});
export default connect(mapStateToProps)(Layout);
