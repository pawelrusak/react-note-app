import { css } from 'styled-components';
import { ItemVariants } from 'commonTypes';

export const activecolor = css<{ readonly activecolor?: ItemVariants }>`
  background-color: ${(props) =>
    props.activecolor ? props.theme[props.activecolor] : props.theme.notes};
`;
