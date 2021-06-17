import Paragraph from './Paragraph';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Atoms/Paragraph',
  component: Paragraph,
} as Meta;

export const Default: Story = () => <Paragraph>Hello, World!</Paragraph>;
