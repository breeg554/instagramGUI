import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  background: ${({ theme }) => theme.background.secondary};
  border: none;
  color: ${({ theme }) => theme.text.primary};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem;
`;

const Toggle = ({ toggleTheme }) => {
  return <Button onClick={toggleTheme}>Switch Theme</Button>;
};
Toggle.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
};
export default Toggle;
