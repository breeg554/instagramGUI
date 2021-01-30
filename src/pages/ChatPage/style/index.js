import styled from "styled-components";

export const ChatWrapper = styled.div`
  height: ${({ headerHeight }) => `calc(100vh - ${2 * headerHeight + 10}px )`};
  //2* coz top and bottom margin of main
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 1em;
  & > div,
  form {
    width: 100%;
    padding-right: 1em;
    padding-left: 1em;
  }
  ${({ theme }) => theme.mediaQ.sm} {
    border: 1px solid ${({ theme }) => theme.background.border};
    border-radius: 5px;
    padding-top: 0;
    margin-top: 4em;
    padding-bottom: 1em;
    & > div,
    form {
      padding-right: 1.5em;
      padding-left: 1.5em;
    }
  }
`;
export const ProfileWrapper = styled.div`
  padding-bottom: 0.5em;
  border-bottom: 1px solid ${({ theme }) => theme.background.border};
  ${({ theme }) => theme.mediaQ.sm} {
    padding: 0.7em 0;
  }
`;
export const MessagesWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  overflow: auto;
  margin-top: 0.5em;
  ${({ theme }) => theme.mediaQ.sm} {
    margin: 0.5em 0;
  }
`;
export const SendInputWrapper = styled.form`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.background.border};
  border-radius: 50px;
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
