import {
  AlertDialogLabel,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogContent,
} from '@reach/alert-dialog';
import { useRef } from 'react';
import styled from 'styled-components';

import Button from '~/components/atoms/Button/Button';
import Heading from '~/components/atoms/Heading/Heading';
import Paragraph from '~/components/atoms/Paragraph/Paragraph';
import TextButton from '~/components/atoms/TextButton/TextButton';
import { useClickAway } from '~/hooks';
import * as styledMixin from '~/theme/mixins';

import type { Variant } from '~/commonTypes';
import type { VariantColorValueProp } from '~/theme/mixins';

const StyledWrapper = styled(AlertDialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  ${styledMixin.zIndexDeclaration('modal')};
  background: rgba(10, 10, 10, 0.45);
`;

const StyledHeader = styled(AlertDialogLabel)`
  padding: 2.5rem 2rem 3.7rem;
`;

const StyledPrimaryButton = styled(Button)`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  padding: 1.4rem 6rem;
  margin-bottom: 1.9rem;
  height: initial;
  width: initial;
  line-height: ${({ theme }) => theme.fontSize.xxs};
`;

const StyledContainer = styled(AlertDialogContent)<Required<VariantColorValueProp>>`
  background: white;
  width: min(45.5rem, calc(100% - 4rem));
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

const StyledBody = styled(AlertDialogDescription)`
  padding: ${({ theme }) => 3.7 - (+theme.lineHeight * 1.5) / 2 + 0.8}rem 2rem;
  text-align: center;
`;

const StyledTitle = styled(Heading)`
  margin: 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.m};
  line-height: 1;
`;

const StyledFooter = styled.div`
  padding: 2.5rem 2rem;
  display: flex;
  display: flex;
  flex-direction: column;
  align-items: center;

  *:last-child {
    margin-bottom: 0;
  }
`;

const StyledDescription = styled(Paragraph)`
  margin: 0;
  font-size: 1.5rem;
  line-height: ${({ theme }) => theme.lineHeight};
`;

export type ModalProps = {
  readonly show: boolean;
  readonly variant: Variant;
  readonly children?: React.ReactNode;
  readonly onClickOutside?: (event: React.MouseEvent) => void;
  readonly onDismiss?: (event?: React.SyntheticEvent) => void;
  readonly leastDestructiveRef?: React.RefObject<HTMLElement>;
};

const Modal = ({
  show,
  variant,
  children,
  onClickOutside,
  onDismiss,
  leastDestructiveRef,
}: ModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line
  // @ts-expect-error
  useClickAway<React.MouseEvent>(containerRef, (event) => {
    if (onClickOutside) {
      onClickOutside(event);
    }
  });

  return (
    <StyledWrapper
      ref={containerRef}
      isOpen={show}
      onDismiss={onDismiss}
      leastDestructiveRef={leastDestructiveRef}
    >
      <StyledContainer variant={variant}>{children}</StyledContainer>
    </StyledWrapper>
  );
};

Modal.Header = StyledHeader;
Modal.Title = StyledTitle;
Modal.Body = StyledBody;
Modal.Description = StyledDescription;
Modal.Footer = StyledFooter;
Modal.PrimaryButton = StyledPrimaryButton;
Modal.SecondaryButton = TextButton;

export default Modal;
