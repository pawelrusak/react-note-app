import { keyframes } from 'styled-components';

/**
 * @author Sarah Drasner
 * @see {@link https://css-tricks.com/snippets/css/shake-css-keyframe-animation/}
 */
export const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(360deg);
  }
`;
