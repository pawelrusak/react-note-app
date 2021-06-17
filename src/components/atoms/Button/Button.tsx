import styled, { css } from 'styled-components';

import { activecolor as activecolorMixin } from '~/theme/mixins';

import type { ItemVariants } from '~/commonTypes';

export type ButtonProps =
  | { readonly activecolor?: never; readonly secondary: true }
  | { readonly activecolor: ItemVariants; readonly secondary?: never };

const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 0;
  ${activecolorMixin}
  width: 220px;
  height: 47px;
  border: none;
  border-radius: 50px;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;

  ${({ secondary }) =>
    secondary &&
    css`
      background-color: hsl(0, 0%, 90%);
      width: 105px;
      height: 30px;
      font-size: 10px;
    `}
`;

export default Button;
