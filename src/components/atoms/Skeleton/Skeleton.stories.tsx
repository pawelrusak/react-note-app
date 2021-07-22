import Skeleton, { SkeletonProps } from './Skeleton';

import { SkeletonWrapperDecorator } from '~~/.storybook/decorators';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  decorators: [SkeletonWrapperDecorator],
} as Meta;

const Template: Story<SkeletonProps> = (args) => <Skeleton {...args} />;

export const Default = Template.bind({});

export const Short = Template.bind({});
Short.args = {
  width: '70%',
};

export const Dark = Template.bind({});
Dark.args = {
  dark: true,
};

export const DarkAndShort = Template.bind({});
DarkAndShort.args = {
  ...Short.args,
  ...Dark.args,
};
