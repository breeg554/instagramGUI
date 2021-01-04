import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  font-family: 'Roboto', sans-serif;
  transition: background-color 0.30s linear,color 0.30s linear,border  0.30s linear;
}
`;

export const GlobalRouteStyles = createGlobalStyle`
body{
  background: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.primary};
}
`;
