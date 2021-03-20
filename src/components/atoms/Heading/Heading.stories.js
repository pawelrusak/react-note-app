import Heading from './Heading';

export default {
  title: 'Atoms/Heading',
  component: Heading,
};

const Template = (args) => <Heading {...args}>Hello, World!</Heading>;

export const Normal = Template.bind({});
Normal.args = {
  big: false,
};

export const Big = Template.bind({});
Big.args = {
  big: true,
};
