import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { GlobalRouteStyles } from "./GlobalStyles";
import { darkTheme, lightTheme } from "../utils/theme";
import { useDarkMode } from "./useDarkMode";
import Header from "./Header";
import LoadingCircle from "./Loading";
const Main = styled.main`
  margin-top: ${({ headerHeight }) => `${headerHeight + 5}px`};
  margin-bottom: ${({ headerHeight }) => `${headerHeight + 5}px`};
`;

const Layout = ({ children, userLoading, userAuthorized }) => {
  const headerRef = useRef();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    if (userAuthorized) {
      const header = headerRef.current;
      setHeaderHeight(header.offsetHeight);
    }
  }, [userAuthorized]);

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalRouteStyles />
      {userLoading ? (
        <div style={{ marginTop: "1em" }}>
          <LoadingCircle size={20} />
        </div>
      ) : (
        <div>
          <Header headerRef={headerRef} themeToggler={themeToggler} />
          <Main headerHeight={headerHeight}>{children}</Main>
        </div>
      )}
    </ThemeProvider>
  );
};
const mapStateToProps = (state) => ({
  userAuthorized: state.user.userAuthorized,
  userLoading: state.user.userLoading,
});
export default connect(mapStateToProps)(Layout);
