import { lighten, transparentize } from 'polished';
import styled, { css } from 'styled-components';

import magnifierIcon from '~/assets/icons/magnifier.svg';
import { shake } from '~/theme/keyframes';

/**
 * @todo Remove the 'strongPlaceholder' property after implement the floating label
 */
type StrongPlaceholder = {
  readonly strongPlaceholder?: boolean;
};

export type InputProps =
  | ({ readonly search: true; readonly invalid?: never } & StrongPlaceholder)
  | ({ readonly search?: false; readonly invalid?: boolean } & StrongPlaceholder);

const Input = styled.input<InputProps>`
  box-sizing: border-box;
  padding: 1.55rem 3.5rem;
  min-width: 37.4rem;

  border-radius: 5rem;
  background-color: ${({ theme }) => theme.grey100};
  color: ${({ theme }) => theme.black};
  cursor: text;

  font-style: normal;
  font-weight: ${({ theme }) => theme.normal};
  font-size: ${({ theme }) => theme.fontSize.s};
  line-height: 1;

  border: none;

  &::placeholder {
    // color: hsla(0, 0%, 51%, 0.6);
    // color: ${({ theme }) => theme.grey300};
    color: ${({ theme }) => transparentize(0.4, theme.grey500)};
    ${({ strongPlaceholder }) =>
      strongPlaceholder &&
      css`
        font-weight: ${({ theme }) => theme.bold};
        text-transform: uppercase;
        color: ${({ theme }) => theme.grey500};
      `}
  }

  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.grey500};
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
    // box-shadow: 0 0 0 2px hsl(0, 0%, 51%, 0.8);
    box-shadow: 0 0 0 2px ${({ theme }) => transparentize(0.2, theme.grey500)};
  }

  ${({ search }) =>
    search &&
    css`
      padding: 1.15rem 2rem 1.15rem 4.3rem;
      font-size: ${({ theme }) => theme.fontSize.xs};
      min-width: 23.4rem;
      background-image: url(${magnifierIcon});
      background-size: 1.5rem;
      background-position: 1.4rem 50%;
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
        box-shadow: 0 0 0 2px ${({ theme }) => transparentize(0.4, theme.red200)};
      }
    `}
`;

export default Input;
