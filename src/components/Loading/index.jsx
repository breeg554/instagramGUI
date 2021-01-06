import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PropTypes from "prop-types";
import { StyledLoading } from "./style";
const LoadingCircle = ({ size }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <StyledLoading size={size}>
        <AiOutlineLoading3Quarters />
      </StyledLoading>
    </div>
  );
};

export default LoadingCircle;
LoadingCircle.propTypes = {
  size: PropTypes.number.isRequired,
};
