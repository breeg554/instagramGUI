import styled from "styled-components";

export const Button = styled.button`
  position: relative;
  background-color: ${({ theme }) => theme.text.primary};
  color: ${({ theme }) => theme.background.primary};
  border: none;
  border-radius: 50%;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  font-size: 20px;
  padding: 0.6em;
  overflow: hidden;
  svg {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: top 0.3s ease-out;
  }
  svg:nth-of-type(1) {
    top: ${({ themeMode }) => (themeMode === "light" ? "50%" : "150%")};
  }
  svg:nth-of-type(2) {
    top: ${({ themeMode }) => (themeMode === "dark" ? "50%" : "-50%")};
  }
  ${({ theme }) => theme.mediaQ.sm} {
    cursor: pointer;
  }
`;
