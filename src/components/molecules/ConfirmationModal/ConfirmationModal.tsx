import Modal, { ModalProps } from '~/components/molecules/Modal/Modal';
import { TEST_ID } from '~/constants';

export type ConfirmationModalProps = {
  readonly onConfirm: (event: React.MouseEvent) => void;
  readonly onCancel: ModalProps['onDismiss'];
  readonly cancelRef: React.RefObject<HTMLButtonElement>;
} & Omit<ModalProps, 'children' | 'onClickOutside' | 'onDismiss'>;

const ConfirmationModal = ({
  variant,
  show,
  onConfirm,
  onCancel,
  cancelRef,
}: ConfirmationModalProps) => (
  <Modal
    variant={variant}
    show={show}
    onClickOutside={onCancel}
    onDismiss={onCancel}
    leastDestructiveRef={cancelRef}
  >
    <Modal.Header>
      <Modal.Title>Are you sure?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Modal.Description>This action cannot be undone.</Modal.Description>
    </Modal.Body>
    <Modal.Footer>
      <Modal.PrimaryButton
        onClick={onConfirm}
        data-testid={TEST_ID.CONFIRMATION_MODAL.REMOVE_BUTTON}
      >
        Remove
      </Modal.PrimaryButton>
      <Modal.SecondaryButton ref={cancelRef} onClick={onCancel}>
        no, wait
      </Modal.SecondaryButton>
    </Modal.Footer>
  </Modal>
);

export default ConfirmationModal;
