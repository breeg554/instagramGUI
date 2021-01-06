import styled from "styled-components";
import { Link } from "react-router-dom";
export const PostArticle = styled.article`
  width: 100%;
  margin-bottom: 1em;
`;
export const PostHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.2em 1em;
  h3 {
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.text.primary};
  }
`;
export const ProfilLink = styled(Link)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.5em;
  color: ${({ theme }) => theme.text.secondary};
  border: 0.4px solid ${({ theme }) => theme.background.border};
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
export const PostImg = styled.img`
  width: 100%;
  object-fit: cover;
`;
export const PostSiteWrapper = styled.div`
  width: 100%;
  padding: 0.2em 1em;
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
  margin: 0 1.3em;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.text.primary};
  font-size: 12px;
  font-weight: 100;
`;
