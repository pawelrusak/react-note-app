import { css } from 'styled-components';

export const activecolor = css`
  background-color: ${(props) =>
    props.activecolor ? props.theme[props.activecolor] : props.theme.notes};
`;
