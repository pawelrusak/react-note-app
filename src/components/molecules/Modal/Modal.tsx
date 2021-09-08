import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import * as styledMixin from '~/theme/mixins';
import { Portal } from '~/utils/components';

import type { ItemVariants } from '~/commonTypes';
import type { VariantColorValueProp } from '~/theme/mixins';

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.45);
`;

const StyledHeader = styled.div`
  padding: 2.5rem 10rem 3.7rem;
`;

const StyledPrimaryButton = styled(Button)`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  padding: 1.4rem 6rem;
  margin-bottom: 1.9rem;
  height: initial;
  width: initial;
  line-height: ${({ theme }) => theme.fontSize.xxs};
`;

const StyledContainer = styled.div<Required<VariantColorValueProp>>`
  background: white;
  min-width: 45.5rem;
  min-height: 5rem;
  border-radius: 0.7rem;
  overflow: hidden;
  filter: drop-shadow(0px 7px 7px rgba(0, 0, 0, 0.09));

  ${StyledHeader}, ${StyledPrimaryButton} {
    background: ${styledMixin.variantColorValue()};
  }

  ${StyledPrimaryButton}:hover {
    background: ${styledMixin.variantColorValue({ darken: true })};
  }
`;

const StyledBody = styled.div`
  padding: ${({ theme }) => 3.7 - (+theme.lineHeight * 1.5) / 2 + 0.8}rem 10rem;
  text-align: center;
`;

const StyledTitle = styled(Heading)`
  margin: 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.m};
  line-height: 1;
`;

const StyledFooter = styled.div`
  padding: 2.5rem 10rem;
  display: flex;
  display: flex;
  flex-direction: column;
  align-items: center;

  *:last-child {
    margin-bottom: 0;
  }
`;

const StyledSecondaryButton = styled.button`
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

const StyledDescription = styled(Paragraph)`
  margin: 0;
  font-size: 1.5rem;
  line-height: ${({ theme }) => theme.lineHeight};
`;

export type ModalProps = {
  readonly show: boolean;
  readonly variant: ItemVariants;
  readonly children?: React.ReactNode;
};

const Modal = ({ show, variant, children }: ModalProps) =>
  show ? (
    <Portal>
      <StyledWrapper>
        <StyledContainer variant={variant}>{children}</StyledContainer>
      </StyledWrapper>
    </Portal>
  ) : null;

Modal.Header = StyledHeader;
Modal.Title = StyledTitle;
Modal.Body = StyledBody;
Modal.Description = StyledDescription;
Modal.Footer = StyledFooter;
Modal.PrimaryButton = StyledPrimaryButton;
Modal.SecondaryButton = StyledSecondaryButton;

export default Modal;
