import styled from "styled-components";

const MOBILE_PROFILE_COLUMN_SIZE = 90;
const SM_PROFILE_COLUMN_SIZE = 130;
const MD_PROFILE_COLUMN_SIZE = 160;
export const Header = styled.header`
  width: 100%;
  display: grid;
  grid-template-columns: ${MOBILE_PROFILE_COLUMN_SIZE}px 1fr;
  grid-template-areas:
    "img name"
    "stats stats";
  padding-top: 1em;
  padding-bottom: 1.5em;
  h1 {
    font-weight: 300;
    font-size: 25px;
    margin-left: 0.4em;
    color: ${({ theme }) => theme.text.primary};
    grid-area: name;
    align-self: center;
  }
  ${({ theme }) => theme.mediaQ.sm} {
    grid-template-columns: ${SM_PROFILE_COLUMN_SIZE}px 1fr;
    grid-template-areas:
      "img name"
      "img stats";
    margin-bottom: 1em;
    border-bottom: 1px solid ${({ theme }) => theme.background.border};
    h1 {
      align-self: end;
      font-size: 28px;
    }
  }
  ${({ theme }) => theme.mediaQ.md} {
    grid-template-columns: ${MD_PROFILE_COLUMN_SIZE}px 1fr;
  }
`;
export const ProfileImgWrapper = styled.div`
  width: ${MOBILE_PROFILE_COLUMN_SIZE - 20}px;
  height: ${MOBILE_PROFILE_COLUMN_SIZE - 20}px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background.secondary};
  grid-area: img;
  margin-left: 1em;
  img,
  svg {
    width: 100%;
    height: 100%;
  }
  img {
    object-fit: cover;
  }
  ${({ theme }) => theme.mediaQ.sm} {
    width: ${SM_PROFILE_COLUMN_SIZE - 30}px;
    height: ${SM_PROFILE_COLUMN_SIZE - 30}px;
  }
  ${({ theme }) => theme.mediaQ.md} {
    width: ${MD_PROFILE_COLUMN_SIZE - 30}px;
    height: ${MD_PROFILE_COLUMN_SIZE - 30}px;
  }
`;

export const StatsWrapper = styled.ul`
  grid-area: stats;
  width: 100%;
  margin: 1em 0;
  padding: 1em 0;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.background.border};
  border-bottom: 1px solid ${({ theme }) => theme.background.border};
  ${({ theme }) => theme.mediaQ.sm} {
    border: none;
    margin: 0;
    padding: 0 0 0 0.7em;
    align-items: flex-start;
    justify-content: flex-start;
  }
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
  ${({ theme }) => theme.mediaQ.sm} {
    margin: 0 0.5em 0 0;

    &,
    button {
      font-size: 16px;
    }
    span,
    button {
      display: inline-block;
    }
    strong {
      margin: 0 0.4em;
    }
  }
`;

export const NotFound = styled.div`
  width: 100%;
  margin-top: 5em;
  text-align: center;
  a {
    font-size: 12px;
    color: ${({ theme }) => theme.text.primary};
  }
`;
