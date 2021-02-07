import Input from './Input';

export default {
  title: 'Input',
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'login',
  search: false,
};

export const Search = Template.bind({});
Search.args = {
  placeholder: 'search',
  search: true,
};
