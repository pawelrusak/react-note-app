import * as polished from 'polished';
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
    polished.lighten(0.1, props.activecolor ? props.theme[props.activecolor] : props.theme.notes)};
`;

export const darkenActiveColor = css<LightenActiveColorArgs>`
  background-color: ${(props) =>
    polished.darken(0.075, props.activecolor ? props.theme[props.activecolor] : props.theme.notes)};
`;

export const lightenBlack = css`
  ${({ theme }) => polished.lighten(0.3, theme.black)}
`;

export const lightenBlackText = css`
  color: ${lightenBlack};
`;

export type VariantColorValueProp = {
  readonly variant?: ItemVariants;
};

type VariantColorValueArgs = {
  readonly lighten?: boolean;
  readonly darken?: boolean;
};

export const variantColorValue = ({
  lighten,
  darken,
}: VariantColorValueArgs = {}) => css<VariantColorValueProp>`
  ${({ variant, theme }) => {
    const variantColor = variant ? theme[variant] : theme.notes;

    if (lighten === true) {
      return polished.lighten(0.1, variantColor);
    }

    if (darken === true) {
      return polished.darken(0.075, variantColor);
    }

    return variantColor;
  }}
`;

export const transitionTransformForNewItemBarAndHisToggleButton = css`
  transition: transform 0.25s ease-in-out;
`;
