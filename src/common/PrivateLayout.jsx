import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { GlobalRouteStyles } from "./GlobalStyles";
import { darkTheme, lightTheme } from "../utils/theme";
import { useDarkMode } from "./useDarkMode";
import Header from "./Header";

const Main = styled.main`
  margin-top: ${({ headerHeight }) => `${headerHeight + 5}px`};
  margin-bottom: ${({ headerHeight }) => `${headerHeight + 5}px`};
`;

const Layout = ({ children, user_loading, user_authorized }) => {
  const headerRef = useRef();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    if (user_authorized) {
      const header = headerRef.current;
      setHeaderHeight(header.offsetHeight);
    }
  }, [user_authorized]);

  if (user_loading) return <div />;
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalRouteStyles />
      <Header headerRef={headerRef} themeToggler={themeToggler} />
      <Main headerHeight={headerHeight}>{children}</Main>
    </ThemeProvider>
  );
};
const mapStateToProps = (state) => ({
  user_authorized: state.user.user_authorized,
  user_loading: state.user.user_loading,
});
export default connect(mapStateToProps)(Layout);
