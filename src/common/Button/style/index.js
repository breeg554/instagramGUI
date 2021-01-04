import styled from "styled-components";

export const StyledButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text.primary};
  &:focus {
    outline: none;
  }
`; //Style used in icon btn
