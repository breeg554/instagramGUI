import React from "react";
import PropTypes from "prop-types";
import { Button } from "./style";
import { HiSun, HiMoon } from "react-icons/hi";
const Toggle = ({ toggleTheme, theme, size }) => {
  return (
    <Button onClick={toggleTheme} themeMode={theme} size={size}>
      <HiSun />
      <HiMoon />
    </Button>
  );
};
export default Toggle;
Toggle.defaultProps = {
  size: 30,
};
Toggle.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};
