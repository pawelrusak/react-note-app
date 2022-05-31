import * as polished from 'polished';
import styled, { css } from 'styled-components';

import * as styledKeyframe from '~/theme/keyframes';
import * as styledMixin from '~/theme/mixins';

import type { Variants } from '~/commonTypes';

const SPINNER_HEIGHT = 18;

export type ButtonProps =
  | Readonly<{ variant?: never; secondary: true; pending?: never }>
  | Readonly<{ variant?: Variants; secondary?: never; pending?: boolean }>;

const Button = styled.button<ButtonProps>`
  background-color: ${styledMixin.variantColorValue()};
  border-radius: 5rem;
  border: none;
  cursor: pointer;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: ${({ theme }) => theme.bold};
  font-size: 1.6rem;
  line-height: 1.6rem;
  padding: 1.6rem 3.2rem;
  min-width: 22.5rem;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.black};

  @media (prefers-reduced-motion: no-preference) {
    transition: background-color 0.15s ease-in-out;
  }

  &:hover {
    background-color: ${styledMixin.variantColorValue({ darken: true })};
  }

  ${({ secondary }) =>
    secondary
      ? css`
          font-size: 1rem;
          line-height: 1rem;
          padding: 1.1rem 2.2rem;
          min-width: 10.6rem;
          background-color: ${({ theme }) => theme.grey200};

          &:hover {
            background-color: ${({ theme }) => theme.grey200};
            background-color: ${({ theme }) => polished.darken(0.075, theme.grey200)};
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
