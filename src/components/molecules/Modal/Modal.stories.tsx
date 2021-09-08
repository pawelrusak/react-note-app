import Modal, { ModalProps } from './Modal';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Molecules/Modal',
  component: Modal,
} as Meta;

type AdditionalModalStoryProps = Readonly<{
  showHeader: boolean;
  showTitle: boolean;
  titleText: string;
  showBody: boolean;
  showDescription: boolean;
  descriptionText: string;
  showFooter: boolean;
  showPrimaryButton: boolean;
  primaryButtonText: string;
  showSecondaryButton: boolean;
  secondaryButtonText: string;
}>;

const Template: Story<ModalProps & AdditionalModalStoryProps> = ({
  showHeader,
  showTitle,
  titleText,
  showBody,
  showDescription,
  descriptionText,
  showFooter,
  showPrimaryButton,
  primaryButtonText,
  showSecondaryButton,
  secondaryButtonText,
  ...args
}) => (
  <Modal {...args}>
    {showHeader && (
      <Modal.Header>{showTitle && <Modal.Title>{titleText}</Modal.Title>}</Modal.Header>
    )}
    {showBody && (
      <Modal.Body>
        {showDescription && <Modal.Description>{descriptionText}</Modal.Description>}
      </Modal.Body>
    )}
    {showFooter && (
      <Modal.Footer>
        {showPrimaryButton && <Modal.PrimaryButton>{primaryButtonText}</Modal.PrimaryButton>}
        {showSecondaryButton && (
          <Modal.SecondaryButton>{secondaryButtonText}</Modal.SecondaryButton>
        )}
      </Modal.Footer>
    )}
  </Modal>
);

export const Note = Template.bind({});
Note.args = {
  show: true,
  variant: 'notes',
  showHeader: true,
  showTitle: true,
  titleText: 'Modal title!',
  showBody: true,
  showDescription: true,
  descriptionText: 'Modal description.',
  showFooter: true,
  showPrimaryButton: true,
  primaryButtonText: 'Primary Button',
  showSecondaryButton: true,
  secondaryButtonText: 'Secondary Button',
};
Note.argTypes = {
  variant: {
    control: {
      type: 'inline-radio',
      options: ['notes', 'twitters', 'articles'],
    },
  },
};

export const Twitter = Template.bind({});
Twitter.args = {
  ...Note.args,
  variant: 'twitters',
};
Twitter.argTypes = {
  ...Note.argTypes,
};

export const Article = Template.bind({});
Article.args = {
  ...Note.args,
  variant: 'articles',
};
Article.argTypes = {
  ...Note.argTypes,
};
