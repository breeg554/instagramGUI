import styled, { keyframes } from "styled-components";
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
export const StyledLoading = styled.span`
  display: inline-block;
  text-align: center;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  color: ${({ theme }) => theme.text.primary};
  animation: ${rotate} 0.4s ease-in infinite;
  svg {
    width: 100%;
    height: 100%;
  }
`;
