import * as polished from 'polished';
import { css } from 'styled-components';

import { isNumber } from '~/utils/guards';

import type { DefaultTheme } from 'styled-components';
import type { ItemVariants } from '~/commonTypes';

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

type ZIndexDefaultTheme = DefaultTheme['zIndex'];
type ZIndexDefaultThemeKeys = keyof ZIndexDefaultTheme;

export const zIndexDeclaration = (themeZIndex: ZIndexDefaultThemeKeys | number) => css`
  z-index: ${({ theme }) => (isNumber(themeZIndex) ? themeZIndex : theme.zIndex[themeZIndex])};
`;
