import styled from "styled-components";

export const Button = styled.button`
  position: relative;
  height: 30px;
  padding: 0 0.7em;

  background-color: ${({ isFollowed, isLoading, theme }) =>
    isLoading
      ? theme.background.disabled
      : isFollowed
      ? theme.background.primary
      : theme.background.follow};
  border: 0.5px solid
    ${({ isFollowed, isLoading, theme }) =>
      isLoading
        ? theme.background.disabled
        : isFollowed
        ? theme.background.border
        : theme.background.follow};
  border-radius: 2px;
  color: ${({ isFollowed, theme }) =>
    isFollowed ? theme.text.primary : "#fff"};
  display: flex;
  align-items: center;
  & > svg {
    width: 30px;
    height: 15px;
  }
  &:focus {
    outline: none;
  }
  ${({ theme }) => theme.mediaQ.sm} {
    margin-left: 0.5em;
    cursor: pointer;
  }
`;
export const LoadingWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
