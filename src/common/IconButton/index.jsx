import PropTypes from "prop-types";
import { StyledIconBtn } from "./style";

const Button = ({ children, size }) => {
  return <StyledIconBtn size={size}>{children}</StyledIconBtn>;
};

export default Button;
Button.defaultProps = {
  size: 25,
};
Button.propTypes = {
  size: PropTypes.number.isRequired,
};
