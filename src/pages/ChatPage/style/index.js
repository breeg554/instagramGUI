import styled from "styled-components";

export const ChatWrapper = styled.div`
  height: ${({ headerHeight }) => `calc(100vh - ${2 * headerHeight}px)`};
  //2* coz top and bottom margin of main
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1em 1em 0 1em;
  & > div {
    width: 100%;
  }
`;
export const MessagesWrapper = styled.div`
  margin: 0.5em 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
`;
export const SendInputWrapper = styled.div`
  height: 40px;
  border: 1px solid ${({ theme }) => theme.background.border};
  border-radius: 50px;
  padding: 0 1em;
  display: flex;
  input {
    background-color: transparent;
    flex-grow: 1;
    border: none;
    color: ${({ theme }) => theme.text.primary};
    &:focus {
      outline: none;
    }
  }
`;
export const SendButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.background.follow};
  margin: 0 0.3em;
  cursor: pointer;
`;
