import styled from "styled-components";
import { Link } from "react-router-dom";
export const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.background.primary};
  border-bottom: 0.5px solid ${({ theme }) => theme.background.border};
  width: 100%;
`;
export const StyledHeader = styled.header`
  width: 100%;
  max-width: ${({ theme }) => theme.maxHeaderWidth};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
`;

export const MobileBottomHeader = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.background.primary};
  border-top: 0.5px solid ${({ theme }) => theme.background.border};
  padding: 0.3em 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoApp = styled(Link)`
  font-family: "Lobster", cursive;
  font-size: 25px;
  color: ${({ theme }) => theme.text.primary};
  text-decoration: none;
`;
export const HeaderIconWrapper = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaQ.sm} {
    & > button:not(:nth-last-of-type(1)),
    & > a {
      margin-right: 0.6em;
    }
  }
`;
