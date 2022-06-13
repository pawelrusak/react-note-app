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
  placeholder: 'Login',
  search: false,
  strongPlaceholder: false,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  ...Default.args,
  strongPlaceholder: true,
};

export const Search = Template.bind({});
Search.args = {
  placeholder: 'Search',
  search: true,
  strongPlaceholder: false,
};

export const SearchWithLabel = Template.bind({});
SearchWithLabel.args = {
  ...Search.args,
  strongPlaceholder: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
  ...Default.args,
  placeholder: 'Invalid',
  invalid: true,
};

export const InvalidWithLabel = Template.bind({});
InvalidWithLabel.args = {
  ...Invalid.args,
  strongPlaceholder: true,
};
