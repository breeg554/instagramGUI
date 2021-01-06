import styled from "styled-components";

export const PostWrapper = styled.div`
  padding-top: 0.3em;
  width: 100%;
  margin: 0 auto;
  ${({ theme }) => theme.mediaQ.sm} {
    padding-top: 2em;
  }
`;
