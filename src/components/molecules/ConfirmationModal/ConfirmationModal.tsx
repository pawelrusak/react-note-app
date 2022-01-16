import Modal, { ModalProps } from '~/components/molecules/Modal/Modal';
import { TEST_ID } from '~/constants';

export type ConfirmationModalProps = {
  onConfirm: (event: React.MouseEvent) => void;
  onCancel: (event: React.MouseEvent) => void;
} & Omit<ModalProps, 'children' | 'onClickOutside'>;

const ConfirmationModal = ({ variant, show, onConfirm, onCancel }: ConfirmationModalProps) => (
  <Modal variant={variant} show={show} onClickOutside={onCancel}>
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
      <Modal.SecondaryButton onClick={onCancel}>no, wait</Modal.SecondaryButton>
    </Modal.Footer>
  </Modal>
);

export default ConfirmationModal;
