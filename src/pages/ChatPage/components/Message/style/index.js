import styled from "styled-components";

export const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin: ${({ isMyMessage }) => (isMyMessage ? "0.3em 0" : "0.6em 0")};
  position: relative;
`;
const MESSAGE_LARGE_RADIUS = "20px";
const MESSAGE_SMALL_RADIUS = "10px";
export const StyledMessage = styled.p`
  max-width: 50%;
  height: auto;
  margin-left: ${({ isMyMessage }) => (isMyMessage ? "auto" : 0)};
  text-align: ${({ isMyMessage }) => (isMyMessage ? "right" : "left")};
  padding: 0.5em 1em;
  border-top-left-radius: ${({ isMyMessage }) =>
    isMyMessage ? MESSAGE_LARGE_RADIUS : MESSAGE_SMALL_RADIUS};
  border-bottom-left-radius: ${({ isMyMessage }) =>
    isMyMessage ? MESSAGE_LARGE_RADIUS : MESSAGE_SMALL_RADIUS};
  border-top-right-radius: ${({ isMyMessage }) =>
    isMyMessage ? MESSAGE_SMALL_RADIUS : MESSAGE_LARGE_RADIUS};
  border-bottom-right-radius: ${({ isMyMessage }) =>
    isMyMessage ? MESSAGE_SMALL_RADIUS : MESSAGE_LARGE_RADIUS};
  background-color: ${({ theme }) => theme.background.secondary};
  word-break: break-all;
`;
export const SenderName = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(10%, -100%);
  font-size: 11px;
  color: ${({ theme }) => theme.text.secondary};
`;
