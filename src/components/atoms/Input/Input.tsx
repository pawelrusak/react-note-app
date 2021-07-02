import styled, { css } from 'styled-components';

import magnifierIcon from '~/assets/icons/magnifier.svg';
import { shake } from '~/theme/keyframes';

export type InputProps =
  | { readonly search: true; readonly invalid?: never }
  | { readonly search?: false; readonly invalid?: boolean };

/**
 * @todo add custom outline when the input element is focus
 */
const Input = styled.input<InputProps>`
  padding: 15px 30px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.light};
  background-color: ${({ theme }) => theme.grey100};
  border: none;
  border-radius: 50px;
  box-sizing: border-box;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.grey300};
  }

  ${({ search }) =>
    search &&
    css`
      padding: 10px 20px 10px 40px;
      font-size: ${({ theme }) => theme.fontSize.xs};
      background-image: url(${magnifierIcon});
      background-size: 15px;
      background-position: 15px 50%;
      background-repeat: no-repeat;
    `}

  ${({ invalid }) =>
    invalid &&
    css`
      background-color: ${({ theme }) => theme.red100};
      animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;

      ::placeholder {
        color: ${({ theme }) => theme.red200};
      }
    `}
`;

export default Input;
