import styled from 'styled-components';

const TextButton = styled.button`
  color: #434343;
  font-weight: ${({ theme }) => theme.bold};
  font-size: 1.5rem;
  text-transform: lowercase;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  line-height: 1;
  position: relative;
  margin: 0;
  padding: 0;
  text-shadow: white 2px 0 0, white -2px 0 0, white 0 1px 0;

  &::after,
  &::before {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    height: 1px;
    background-color: currentColor;
  }

  &::after {
    width: 1ch;
  }

  &::before {
    width: 100%;
    transform: scaleX(0);
    // behind the text-shadow
    z-index: -1;
  }

  @media (prefers-reduced-motion: no-preference) {
    &::before {
      transition: transform 0.15s ease-in-out;
      transform-origin: left;
    }
  }

  &:hover::before {
    transform: scaleX(100%);
  }
`;

export default TextButton;
