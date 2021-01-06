import { ThemeProvider } from "styled-components";
import { GlobalRouteStyles } from "./GlobalStyles";
import { lightTheme } from "../utils/theme";

const PublicLayout = ({ component: Component }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalRouteStyles />
      <main>
        <Component />
      </main>
    </ThemeProvider>
  );
};

export default PublicLayout;
