import { css } from 'styled-components';

import type { ItemVariants } from '~/commonTypes';

export type ActiveColorArgs = { readonly activecolor?: ItemVariants };

export const activecolor = css<ActiveColorArgs>`
  background-color: ${(props) =>
    props.activecolor ? props.theme[props.activecolor] : props.theme.notes};
`;
