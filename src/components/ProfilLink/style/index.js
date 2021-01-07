import styled from "styled-components";
import { Link } from "react-router-dom";
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
