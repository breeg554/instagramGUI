import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaQ.sm} {
    & > div,
    section {
      width: 100%;
      max-width: 330px;
      padding: 1em;
      border-radius: 3px;
      border: 1px solid ${({ theme }) => theme.background.border};
    }
  }
`;
export const SideWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;
`;
export const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 13px;
  margin-bottom: 3em;
  p {
    margin-right: 0.3em;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.background.follow};
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 250px;
    margin-top: 0.5em;
  }
`;

export const Logo = styled.h1`
  font-family: "Lobster", cursive;
  font-size: 45px;
  font-weight: 300;
  color: ${({ theme }) => theme.text.primary};
  text-decoration: none;
  margin-bottom: 0.6em;
`;
export const SubText = styled.p`
  margin-bottom: 1.2em;
  font-size: 17px;
  font-weight: 600;
  width: 300px;
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
`;
export const ErrorMessage = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.text.like};
`;
