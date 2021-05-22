import { Meta, Story } from '@storybook/react';
import Heading, { HeadingProps } from './Heading';

export default {
  title: 'Atoms/Heading',
  component: Heading,
} as Meta;

const Template: Story<HeadingProps> = (args) => <Heading {...args}>Hello, World!</Heading>;

export const Default = Template.bind({});
Default.args = {
  big: false,
};

export const Big = Template.bind({});
Big.args = {
  big: true,
};
