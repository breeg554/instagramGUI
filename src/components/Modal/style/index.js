import styled, { ThemeContext } from "styled-components";

export const StyledModal = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;
export const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  background-color: ${({ theme }) => theme.background.primary};
  padding: 2em;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  fieldset {
    width: 100%;
    border: none;
  }
`;
export const CloseButton = styled.button`
  position: absolute;
  top: 0.2em;
  right: 0.2em;
  background-color: transparent;
  border: none;
  font-size: 25px;
  color: ${({ theme }) => theme.text.primary};
`;
