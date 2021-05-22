import styled from 'styled-components';

export type ButtonIconProps = {
  readonly className?: 'active';
  readonly icon: string;
};

const ButtonIcon = styled.button<ButtonIconProps>`
  display: block;
  width: 67px;
  height: 67px;
  border-radius: 20px;
  background-image: url(${({ icon }) => icon});
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 50% 50%;
  border: none;

  &.active {
    background-color: white;
  }
`;

export default ButtonIcon;
