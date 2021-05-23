import { Meta, Story } from '@storybook/react';
import Paragraph from './Paragraph';

export default {
  title: 'Atoms/Paragraph',
  component: Paragraph,
} as Meta;

export const Default: Story = () => <Paragraph>Hello, World!</Paragraph>;
