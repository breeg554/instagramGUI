import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin: 0.4em 0;
    width: 100%;
    object-fit: cover;
  }
  input {
    margin-bottom: 0.5em;
  }
  button {
    padding: 0.5em 1em;
    color: ${({ theme }) => theme.text.primary};
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.background.border};
    cursor: pointer;
    border-radius: 3px;
  }
`;
