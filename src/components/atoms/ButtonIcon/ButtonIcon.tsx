import { transparentize } from 'polished';
import styled from 'styled-components';

export type ButtonIconProps = {
  readonly className?: 'active';
  readonly icon: string;
};

const ButtonIcon = styled.button<ButtonIconProps>`
  display: block;
  width: 6.7rem;
  height: 6.7rem;
  border-radius: 2rem;
  background-image: url(${({ icon }) => icon});
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 50% 50%;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${transparentize(0.7, 'white')};
  }

  &.active {
    background-color: white;
  }
`;

export default ButtonIcon;
