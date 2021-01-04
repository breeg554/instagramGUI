import styled from "styled-components";

export const StyledHeader = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background.primary};
  border-bottom: 0.5px solid ${({ theme }) => theme.background.border};
  padding: 0.5em 1em;
`;

export const StyledSubHeader = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: red;
  background-color: ${({ theme }) => theme.background.primary};
  border-top: 0.5px solid ${({ theme }) => theme.background.border};
  padding: 0.3em 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoApp = styled.div`
  font-family: "Lobster", cursive;
  font-size: 25px;
  span {
    color: ${({ theme }) => theme.text.primary};
  }
`;
export const HeaderIconWrapper = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-left: 0.5em;
  }
`;
