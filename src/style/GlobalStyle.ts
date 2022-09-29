import { createGlobalStyle } from "styled-components";
import { styledTheme } from "./styledTheme";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  *, ::before, ::after {
    font-family: Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    color: ${styledTheme.colors.text};
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  button {
    appearance: none;
    border: none;
    background: ${styledTheme.colors.primary};
    color: ${styledTheme.colors.textOnDark};
    border: ${styledTheme.borderRadius.s};
    border-radius: ${styledTheme.borderRadius.s};
    font-size: ${styledTheme.fontSize.s};
    padding:  ${styledTheme.spacings.xs} ${styledTheme.spacings.s};

    :hover {
      cursor: pointer;
      background: ${styledTheme.colors.primaryDark};
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  thead {
    border-bottom: 1px solid ${styledTheme.colors.surfaceBorder};
  }

  th {
    text-align: left;
  }

  th, td {
    padding: 10px 15px;
  }

  tr {
    :nth-child(even) {
      background: ${styledTheme.colors.surfaceBgDark}
    }
  }
`;
