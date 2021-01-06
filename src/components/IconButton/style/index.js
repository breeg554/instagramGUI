import styled from "styled-components";
import { StyledButton } from "../../Button/style";
export const StyledIconBtn = styled(StyledButton)`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  svg,
  img {
    height: 100%;
    width: 100%;
  }
  img {
    object-fit: cover;
    border-radius: 50%;
  }
  ${({ theme }) => theme.mediaQ.md} {
    cursor: pointer;
  }
`;
