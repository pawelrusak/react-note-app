import 'styled-components';

/**
 * @todo Group properties by type eg. color [notes, twitters, ...], font: [weight: [bold, light, ...]]
 */
declare module 'styled-components' {
  export interface DefaultTheme {
    notes: string;
    twitters: string;
    articles: string;
    grey100: string;
    grey200: string;
    grey300: string;
    grey500: string;
    grey700: string;
    black: string;
    red100: string;
    red200: string;
    red300: string;
    lineHeight: string | number;
    light: number;
    normal: number;
    bold: number;
    fontSize: {
      xxs: string;
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
    };
    zIndex: {
      cardHeader: number;
      newItemBar: number;
      gridTemplateButtonIcon: number;
      navbar: number;
      modal: number;
    };
  }
}
