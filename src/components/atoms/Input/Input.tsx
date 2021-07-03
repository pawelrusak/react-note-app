import { lighten } from 'polished';
import styled, { css } from 'styled-components';

import magnifierIcon from '~/assets/icons/magnifier.svg';
import { shake } from '~/theme/keyframes';

export type InputProps =
  | { readonly search: true; readonly invalid?: never }
  | { readonly search?: false; readonly invalid?: boolean };

const Input = styled.input<InputProps>`
  padding: 15px 30px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.light};
  background-color: ${({ theme }) => theme.grey100};
  border: none;
  border-radius: 50px;
  box-sizing: border-box;

  &::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.grey300};
  }

  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => lighten(0.18, theme.grey300)};
  }

  &:focus {
    /**
     * Turned off the 'outline' property isn't a good idea, but I did it knowing 
     * that, in a production application I probably wouldn't do this. 
     * For more details, check out the link below:
     *
     * @see(@link https://www.w3.org/WAI/GL/2016/WD-WCAG20-TECHS-20160105/F78)
     *
     * This decision may change later.
     */
    outline: none;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.grey300};
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

      &::placeholder {
        color: ${({ theme }) => theme.red200};
      }

      &:hover {
        box-shadow: 0 0 0 1px ${({ theme }) => lighten(0.2, theme.red200)};
      }

      &:focus {
        box-shadow: 0 0 0 1px ${({ theme }) => theme.red200};
      }
    `}
`;

export default Input;
