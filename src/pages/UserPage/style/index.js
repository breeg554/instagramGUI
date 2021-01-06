import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1em 1em 0 1em;
  h1 {
    font-weight: 300;
    font-size: 25px;
    margin-left: 0.4em;
    color: ${({ theme }) => theme.text.primary};
  }
`;
export const ProfileImgWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background.secondary};
  img,
  svg {
    width: 100%;
    height: 100%;
  }
  img {
    object-fit: cover;
  }
`;

export const StatsWrapper = styled.ul`
  margin: 1em 0;
  padding: 1em 0;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.background.border};
  border-bottom: 1px solid ${({ theme }) => theme.background.border};
`;
export const StatsElement = styled.li`
  margin: 0 1em;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text.secondary};
  text-align: center;
  strong {
    color: ${({ theme }) => theme.text.primary};
    font-weight: 600;
  }
  span,
  button {
    display: block;
    margin: 0 auto;
  }
  button {
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.text.primary};
  }
`;
