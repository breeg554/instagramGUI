import styled from "styled-components";
import { Link } from "react-router-dom";
export const ProfilLink = styled(Link)`
  color: #eee;
  display: flex;
  align-items: center;
  text-decoration: none;
  & > div {
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    border-radius: 50%;
    background-color: #ccc;
    overflow: hidden;
    position: relative;
  }
  img,
  svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
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
