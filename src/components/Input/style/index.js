import styled from "styled-components";

export const StyledInput = styled.input`
  padding: 0.6em 1em;
  border: 1.5px solid
    ${({ theme, borderColor }) =>
      borderColor ? borderColor : theme.text.secondary};
  border-radius: 3px;
  &::placeholder {
    color: #ccc;
  }
`;
