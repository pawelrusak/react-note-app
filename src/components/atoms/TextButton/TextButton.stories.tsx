import TextButton from './TextButton';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Atoms/TextButton',
  component: TextButton,
} as Meta;

export const Default: Story = () => <TextButton>Hello, World!</TextButton>;
