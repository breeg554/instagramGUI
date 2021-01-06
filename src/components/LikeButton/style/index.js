import styled from "styled-components";
export const LikeButton = styled.button`
  position: relative;
  border: none;
  background: transparent;
  color: ${({ theme, active }) =>
    active ? theme.text.like : theme.text.primary};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  svg {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.2s cubic-bezier(0, 0, 0.02, 1.77);
  }
  svg:nth-of-type(1) {
    transform: ${({ active }) => (active ? "scale(1)" : "scale(0)")};
  }
  svg:nth-of-type(2) {
    transform: ${({ active }) => (active ? "scale(0)" : "scale(1)")};
  }
  &:focus {
    outline: none;
  }
`;
