import { render, screen, userEvent } from 'testUtils';

import ConfirmationModal, { ConfirmationModalProps } from '../ConfirmationModal/ConfirmationModal';

type RenderConfirmationModalProps = Partial<ConfirmationModalProps>;

const renderConfirmationModal = ({
  show = true,
  variant = 'notes',
  onConfirm = () => ({}),
  onCancel = () => ({}),
}: RenderConfirmationModalProps = {}) =>
  render(
    <ConfirmationModal show={show} variant={variant} onConfirm={onConfirm} onCancel={onCancel} />,
    {
      baseElement: document.getElementById('portal-root') as HTMLElement,
    },
  );

const queryByHeadingRoleWithName = () => screen.queryByRole('heading', { name: /are you sure?/i });

describe('<ConfirmationModal />', () => {
  it("don't display component", () => {
    renderConfirmationModal({ show: false });

    expect(queryByHeadingRoleWithName()).not.toBeInTheDocument();
  });

  it('display component', () => {
    renderConfirmationModal({ show: true });

    expect(queryByHeadingRoleWithName()).toBeInTheDocument();
  });

  it('should call the onConfirm prop when the remove button was clicked', () => {
    const clickConfirm = jest.fn();

    renderConfirmationModal({ show: true, onConfirm: clickConfirm });

    expect(clickConfirm).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('button', { name: /remove/i }));

    expect(clickConfirm).toHaveBeenCalledTimes(1);
  });

  it('should call the onCancel prop when the "no, wait" button was clicked', () => {
    const clickCancel = jest.fn();

    renderConfirmationModal({ show: true, onCancel: clickCancel });

    expect(clickCancel).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('button', { name: /no, wait/i }));

    expect(clickCancel).toHaveBeenCalledTimes(1);
  });

  it('should call the onCancel prop when it is clicked outside the modal box', () => {
    const clickCancel = jest.fn();

    renderConfirmationModal({ show: true, onCancel: clickCancel });

    expect(clickCancel).not.toHaveBeenCalled();

    userEvent.click(document.body);

    expect(clickCancel).toHaveBeenCalledTimes(1);
  });
});
