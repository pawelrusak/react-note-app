import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    notes: string;
    twitters: string;
    articles: string;
    grey100: string;
    grey200: string;
    grey300: string;
    black: string;
    red100: string;
    red200: string;
    red300: string;
    light: number;
    bold: number;
    fontSize: {
      xxs: string;
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
    };
  }
}
