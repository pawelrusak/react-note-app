import { createRef } from 'react';
import { render, screen, userEvent } from 'testUtils';

import Modal, { ModalProps } from '../Modal/Modal';
import { theme } from '~/theme/mainTheme';

const MODAL_TEST_ID = {
  TEST_ELEMENT: 'Modal_TestElement',
  HEADER: 'Modal_Header',
};

type RenderModalProps = Partial<Omit<ModalProps, 'children'>>;

const renderModal = ({ variant = 'notes', show = true, ...props }: RenderModalProps = {}) => {
  const buttonRef = createRef<HTMLButtonElement>();

  return render(
    <Modal variant={variant} show={show} {...props} leastDestructiveRef={buttonRef}>
      <Modal.Header data-testid={MODAL_TEST_ID.HEADER} />
      <Modal.PrimaryButton />
      <div data-testid={MODAL_TEST_ID.TEST_ELEMENT} />
    </Modal>,
    { baseElement: document.getElementById('portal-root') as HTMLElement },
  );
};

const queryModalTestElement = () => screen.queryByTestId(MODAL_TEST_ID.TEST_ELEMENT);

const VARIANTS = {
  NOTES: 'notes',
  TWITTERS: 'twitters',
  ARTICLES: 'articles',
} as const;

const MODAL_VARIANTS_WITH_CORRESPONDING_COLORS = [
  [VARIANTS.NOTES, theme[VARIANTS.NOTES]],
  [VARIANTS.TWITTERS, theme[VARIANTS.TWITTERS]],
  [VARIANTS.ARTICLES, theme[VARIANTS.ARTICLES]],
] as const;

describe('<Modal />', () => {
  it("don't display component", () => {
    renderModal({ show: false });

    expect(queryModalTestElement()).not.toBeInTheDocument();
  });

  it('display component', () => {
    renderModal({ show: true });

    expect(queryModalTestElement()).toBeInTheDocument();
  });

  it.each(MODAL_VARIANTS_WITH_CORRESPONDING_COLORS)(
    'if it has the %s variant, then his header and primary button have the %s background color',
    (variant, colorValue) => {
      renderModal({ variant });

      const variantBackgroundColor = { backgroundColor: colorValue };

      expect(screen.getByTestId(MODAL_TEST_ID.HEADER)).toHaveStyle(variantBackgroundColor);
      expect(screen.getByRole('button')).toHaveStyle(variantBackgroundColor);
    },
  );

  it('should call the onClickOutside property with the mouse event when clicked outside the modal container', () => {
    const clickOutside = jest.fn();

    renderModal({ onClickOutside: clickOutside });

    expect(clickOutside).not.toHaveBeenCalled();

    userEvent.click(document.body);

    expect(clickOutside).toHaveBeenCalledTimes(1);
    expect(clickOutside).toHaveBeenCalledWith(new MouseEvent('mousedown'));
  });
});
