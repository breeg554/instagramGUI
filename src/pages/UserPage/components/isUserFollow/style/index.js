import styled from "styled-components";
import { Link } from "react-router-dom";

export const MessageWrapper = styled.div`
  display: flex;
  ${({ theme }) => theme.mediaQ.sm} {
    margin-bottom: 0.15em;
    margin-left: 0.5em;
  }
`;

export const MessageLink = styled(Link)`
  height: 30px;
  line-height: 30px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  color: ${({ theme }) => theme.text.primary};
  border: 0.5px solid ${({ theme }) => theme.background.border};
  border-radius: 3px;
  padding: 0 1em;
  margin-right: 0.2em;
`;
