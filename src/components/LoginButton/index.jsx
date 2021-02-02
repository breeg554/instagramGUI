import PropTypes from "prop-types";
import { StyledButton } from "./style";
import LoadingCircle from "../Loading";
const Button = ({ children, active, isLoading }) => {
  return (
    <StyledButton disabled={!active || isLoading}>
      {isLoading ? <LoadingCircle size={15} /> : children}
    </StyledButton>
  );
};

export default Button;
Button.defaultProps = {
  active: true,
  isLoading: false,
};
Button.propTypes = {
  children: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};
