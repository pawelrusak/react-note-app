import styled, { css } from 'styled-components';

import * as styledKeyframe from '~/theme/keyframes';
import * as styledMixin from '~/theme/mixins';

import type { ItemVariants } from '~/commonTypes';

const SPINNER_HEIGHT = 18;

export type ButtonProps =
  | { readonly activecolor?: never; readonly secondary: true; pending?: never }
  | { readonly activecolor?: ItemVariants; readonly secondary?: never; pending?: boolean };

const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 0;
  ${styledMixin.activecolor}
  width: 220px;
  height: 47px;
  border: none;
  border-radius: 50px;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    ${styledMixin.darkenActiveColor}
  }

  ${({ secondary }) =>
    secondary &&
    css`
      background-color: hsl(0, 0%, 90%);
      width: 105px;
      height: 30px;
      font-size: 10px;

      &:hover {
        background-color: hsl(0, 0%, 90%);
      }
    `}

  ${({ secondary }) =>
    !secondary &&
    css`
      &:disabled {
        ${styledMixin.lightenActiveColor};
        ${styledMixin.lightenBlackText};
        cursor: not-allowed;
      }
    `}

  ${({ secondary, pending }) =>
    !secondary &&
    !!pending &&
    css`
      &,
      &:hover {
        ${styledMixin.lightenActiveColor}
        color: transparent;
        position: relative;
        cursor: not-allowed;
      }

      &:disabled {
        color: transparent;
      }

      &::after {
        animation: ${styledKeyframe.rotate} 0.5s infinite linear;
        content: '';
        display: block;
        border: 2px solid ${styledMixin.lightenBlack};
        border-radius: 100%;
        border-top-color: transparent;
        border-left-color: transparent;
        position: absolute;
        height: ${SPINNER_HEIGHT}px;
        width: ${SPINNER_HEIGHT}px;
        left: calc(50% - ${SPINNER_HEIGHT / 2}px);
        top: calc(50% - ${SPINNER_HEIGHT / 2}px);
      }
    `}
`;

export default Button;
