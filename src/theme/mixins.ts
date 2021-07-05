import { lighten, darken } from 'polished';
import { css } from 'styled-components';

import type { ItemVariants } from '~/commonTypes';

export type ActiveColorArgs = { readonly activecolor?: ItemVariants };

export const activecolor = css<ActiveColorArgs>`
  background-color: ${(props) =>
    props.activecolor ? props.theme[props.activecolor] : props.theme.notes};
`;

export type LightenActiveColorArgs = ActiveColorArgs;

export const lightenActiveColor = css<LightenActiveColorArgs>`
  background-color: ${(props) =>
    lighten(0.1, props.activecolor ? props.theme[props.activecolor] : props.theme.notes)};
`;

export const darkenActiveColor = css<LightenActiveColorArgs>`
  background-color: ${(props) =>
    darken(0.075, props.activecolor ? props.theme[props.activecolor] : props.theme.notes)};
`;

export const lightenBlack = css`
  ${({ theme }) => lighten(0.3, theme.black)}
`;

export const lightenBlackText = css`
  color: ${lightenBlack};
`;
