import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  notes: 'hsl(49, 100%, 58%)',
  twitters: 'hsl(196, 83%, 75%)',
  articles: 'hsl(106, 47%, 64%)',
  grey100: 'hsl(0, 0%, 96%)',
  grey200: 'hsl(0, 0%, 90%)',
  grey300: 'hsl(0, 0%, 70%)',
  grey500: 'hsl(0, 0%, 51%)',
  grey700: 'hsl(0, 0%, 26%)',
  black: 'hsl(0, 0%, 0%)',
  red100: 'hsl(359, 100%, 95%)',
  red200: 'hsl(359, 100%, 65%)',
  red300: 'hsl(359, 100%, 59%)',
  lineHeight: 1.7,
  light: 300,
  normal: 400,
  bold: 600,
  fontSize: {
    xxs: '1rem',
    xs: '1.2rem',
    s: '1.6rem',
    m: '2.1rem',
    l: '2.4rem',
    xl: '4rem',
  },
  zIndex: {
    cardHeader: 1000,
    newItemBar: 1010,
    gridTemplateButtonIcon: 1020,
    navbar: 1030,
    modal: 1050,
  },
};
