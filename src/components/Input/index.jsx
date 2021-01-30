import PropTypes from "prop-types";
import { StyledInput } from "./style";
const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  borderColor,
  required,
  maxlength,
}) => {
  return (
    <StyledInput
      maxlength={`${maxlength}`}
      required={required}
      type={type}
      name={name}
      placeholder={placeholder}
      borderColor={borderColor}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
Input.defaultProps = {
  type: "text",
  required: false,
  maxlength: 100,
};
Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  borderColor: PropTypes.string,
  required: PropTypes.bool.isRequired,
  maxlength: PropTypes.number.isRequired,
};
