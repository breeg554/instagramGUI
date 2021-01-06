import styled from "styled-components";
import { Link } from "react-router-dom";
export const PostArticle = styled.article`
  width: 100%;
  margin-bottom: 1em;
  ${({ theme }) => theme.mediaQ.sm} {
    border: 0.5px solid ${({ theme }) => theme.background.border};
    border-radius: 5px;
  }
`;
export const PostHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2em 1em;

  ${({ theme }) => theme.mediaQ.sm} {
    padding: 0.7em 1em;
  }
`;
export const ProfilLink = styled(Link)`
  overflow: hidden;
  margin-right: 0.5em;
  color: ${({ theme }) => theme.text.secondary};
  display: flex;
  align-items: center;
  text-decoration: none;
  img,
  svg {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  img {
    object-fit: cover;
  }
  h3 {
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.text.primary};
    margin-left: 0.3em;
  }
`;
export const PostImg = styled.img`
  width: 100%;
  object-fit: cover;
`;
export const PostWrapper = styled.div`
  padding: 0.5em 1em 1em 1em;
`;
export const PostSiteWrapper = styled.div`
  width: 100%;
  padding: 0.2em 0;
  display: flex;
  justify-content: flex-start;
`;
export const PostDescription = styled.p`
  font-size: 12px;
  font-weight: 100;
  color: ${({ theme }) => theme.text.primary};
  strong {
    font-size: 13px;
    font-weight: 600;
    margin-right: 5px;
  }
`;
export const Likes = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.text.primary};
  font-size: 12px;
  font-weight: 100;
`;
