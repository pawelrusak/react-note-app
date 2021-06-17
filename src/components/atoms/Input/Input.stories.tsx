import Input, { InputProps } from './Input';

import type { Meta, Story } from '@storybook/react';

export default {
  title: 'Atoms/Input',
  component: Input,
} as Meta;

type StoryInputProps = InputProps & { readonly placeholder: string };

const Template: Story<StoryInputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'login',
  search: false,
};

export const Search = Template.bind({});
Search.args = {
  placeholder: 'search',
  search: true,
};
