import PropTypes from "prop-types";
import { StyledButton } from "./style";
const Button = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};

export default Button;
Button.propTypes = {
  children: PropTypes.string.isRequired,
};
