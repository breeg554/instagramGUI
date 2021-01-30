import styled from "styled-components";

export const StyledButton = styled.button`
  width: 100%;
  border: none;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.background.follow};
  font-size: 15px;
  margin-top: 1em;
  &:disabled {
    background-color: rgba(0, 149, 246, 0.3);
  }
  ${({ theme }) => theme.mediaQ.sm} {
    cursor: pointer;
  }
`;
