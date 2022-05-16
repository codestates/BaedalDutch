import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Do Hyeon', sans-serif;
    line-height: 1.5;
  }
`;

export default GlobalStyle;
