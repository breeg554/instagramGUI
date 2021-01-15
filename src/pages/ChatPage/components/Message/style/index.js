import styled from "styled-components";

export const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin: 0.4em 0;
`;
export const StyledMessage = styled.div`
  max-width: 50%;
  height: auto;
  margin-left: ${({ isMyMessage }) => (isMyMessage ? "auto" : 0)};
  text-align: ${({ isMyMessage }) => (isMyMessage ? "right" : "left")};
  padding: 0.5em 1em;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.background.secondary};
  word-break: break-all;
`;
