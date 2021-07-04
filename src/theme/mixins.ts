import { lighten } from 'polished';
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

export const lightenBlackText = css`
  color: ${({ theme }) => lighten(0.25, theme.black)};
`;
