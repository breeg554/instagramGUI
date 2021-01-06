import PropTypes from "prop-types";
import { StyledIconBtn } from "./style";

const Button = ({ children, size, func }) => {
  return (
    <StyledIconBtn size={size} onClick={func}>
      {children}
    </StyledIconBtn>
  );
};

export default Button;
Button.defaultProps = {
  size: 25,
};
Button.propTypes = {
  size: PropTypes.number.isRequired,
};
