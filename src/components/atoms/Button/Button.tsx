import styled, { css } from 'styled-components';

import * as styledKeyframe from '~/theme/keyframes';
import * as styledMixin from '~/theme/mixins';

import type { Variants } from '~/commonTypes';

const SPINNER_HEIGHT = 18;

export type ButtonProps =
  | Readonly<{ variant?: never; secondary: true; pending?: never }>
  | Readonly<{ variant?: Variants; secondary?: never; pending?: boolean }>;

const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 0;
  background-color: ${styledMixin.variantColorValue()};
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
    background-color: ${styledMixin.variantColorValue({ darken: true })};
  }

  ${({ secondary }) =>
    secondary
      ? css`
          background-color: hsl(0, 0%, 90%);
          width: 105px;
          height: 30px;
          font-size: 10px;

          &:hover {
            background-color: hsl(0, 0%, 90%);
          }
        `
      : css`
          &:disabled {
            background-color: ${styledMixin.variantColorValue({ lighten: true })};
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
        background-color: ${styledMixin.variantColorValue({ lighten: true })};
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
