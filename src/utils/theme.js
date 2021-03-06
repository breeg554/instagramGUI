const bothTheme = {
  maxBoardWidth: "640px",
  maxHeaderWidth: "935px",
  mediaQ: {
    sm: "@media (min-width: 640px)",
    md: "@media (min-width: 735px)",
  },
};

const lightTheme = {
  ...bothTheme,
  background: {
    primary: "#fff",
    secondary: "#eee",
    border: "#ddd",
    follow: "#0095f6",
    disabled: "#a6a9b6",
  },
  text: {
    primary: "#262626",
    secondary: "#666",
    like: "#ff4646",
  },
};
const darkTheme = {
  ...bothTheme,
  background: {
    primary: "#121212",
    secondary: "#1e1e1e",
    border: "#1e1e1e",
    follow: "#0095f6",
    disabled: "#a6a9b6",
  },
  text: {
    primary: "#fff",
    secondary: "#eceff1",
    like: "#ff4646",
  },
};

export { lightTheme, darkTheme };
